// Gerekli paketleri import ediyoruz.
import express from "express"; // Web sunucusu oluşturmak için Express'i kullanıyoruz.
import bodyParser from "body-parser"; // HTTP isteği verilerini ayrıştırmak için body-parser'ı kullanıyoruz.
import pg from "pg"; // PostgreSQL veritabanı ile bağlantı kurmak için pg paketini kullanıyoruz.
import bcrypt from "bcrypt"; // Parola güvenliği için şifreleme işlemlerinde bcrypt'i kullanıyoruz.
import passport from "passport"; // Kullanıcı kimlik doğrulaması için Passport'u kullanıyoruz.
import { Strategy } from "passport-local"; // Yerel kimlik doğrulama stratejisi için passport-local kullanıyoruz.
import GoogleStrategy from "passport-google-oauth2"; // Google kimlik doğrulama stratejisi için passport-google-oauth2 kullanıyoruz.
import session from "express-session"; // Kullanıcı oturumlarını yönetmek için express-session kullanıyoruz.
import env from "dotenv"; // Ortam değişkenlerini kullanmak için dotenv'i kullanıyoruz.

const app = express(); // Bir Express uygulaması başlatıyoruz.
const port = 3000; // Sunucunun dinleyeceği port numarasını belirtiyoruz.
const saltRounds = 10; // Bcrypt şifreleme algoritması için tuzlama sayısını belirtiyoruz.
env.config(); // Ortam değişkenlerini .env dosyasından yüklemek için dotenv'i başlatıyoruz.

// Kullanıcı oturumlarını yönetmek için bir oturum oluşturuyoruz.
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Oturumları güvenli hale getirmek için gizli anahtar.
    resave: false, // Oturumun her istekte yeniden kaydedilmesini engeller.
    saveUninitialized: false, // Başlangıçta oturumun kaydedilmesini engeller.
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Çerezin ömrünü 1 gün olarak ayarlıyoruz.
      secure: false, // HTTPS kullanılıyorsa secure true olmalı.
      httpOnly: true, // Çerezin yalnızca HTTP isteğiyle gönderilmesini sağlar, JavaScript erişimini engeller.
    },
  })
);

// Görüntü motorunu ayarlıyoruz ve statik dosyaları kullanıma açıyoruz.
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded veri ayrıştırıcıyı etkinleştiriyoruz.
app.use(express.static("public")); // Statik dosyalar için 'public' klasörünü belirtiyoruz.

app.use(passport.initialize()); // Passport'u başlatıyoruz.
app.use(passport.session()); // Passport'un oturum yönetimi için express-session kullanmasına izin veriyoruz.

// PostgreSQL veritabanına bağlanıyoruz.
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect(); // Veritabanına bağlanıyoruz.

// Anasayfa için bir GET isteği route'u oluşturuyoruz.
app.get("/", (req, res) => {
  res.render("home.ejs"); // home.ejs dosyasını render ediyoruz.
});

// Giriş sayfası için GET isteği route'u.
app.get("/login", (req, res) => {
  res.render("login.ejs"); // login.ejs dosyasını render ediyoruz.
});

// Kayıt sayfası için GET isteği route'u.
app.get("/register", (req, res) => {
  res.render("register.ejs"); // register.ejs dosyasını render ediyoruz.
});

// Kullanıcıyı oturumdan çıkartmak için GET isteği route'u.
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err); // Bir hata oluşursa hata yönetimine geçiyoruz.
    }
    res.redirect("/"); // Başarılı olursa ana sayfaya yönlendiriyoruz.
  });
});

// Sadece kimliği doğrulanmış kullanıcıların erişebileceği bir sayfa için GET isteği route'u.
app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs"); // Kimliği doğrulanmışsa secrets.ejs dosyasını render ediyoruz.
  } else {
    res.redirect("/login"); // Aksi halde giriş sayfasına yönlendiriyoruz.
  }
});

// Google ile kimlik doğrulama için GET isteği route'u.
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Google'dan profil ve e-posta bilgilerini talep ediyoruz.
  })
);

// Google kimlik doğrulamasından sonra yönlendirilecek route.
app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets", // Başarılı olursa secrets sayfasına yönlendiriyoruz.
    failureRedirect: "/login", // Başarısız olursa giriş sayfasına yönlendiriyoruz.
  })
);

// Yerel kimlik doğrulama ile giriş yapma için POST isteği route'u.
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets", // Başarılı olursa secrets sayfasına yönlendiriyoruz.
    failureRedirect: "/login", // Başarısız olursa giriş sayfasına yönlendiriyoruz.
  })
);

// Kayıt olma işlemi için POST isteği route'u.
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    // Veritabanında kullanıcının olup olmadığını kontrol ediyoruz.
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login"); // Kullanıcı varsa giriş sayfasına yönlendiriyoruz.
    } else {
      // Kullanıcı yoksa parolayı hash'leyip yeni kullanıcı oluşturuyoruz.
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err); // Şifreleme hatası varsa logluyoruz.
        } else {
          // Yeni kullanıcıyı veritabanına ekliyoruz.
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          // Yeni kullanıcıyı oturumda oturum açıyoruz.
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets"); // Başarılı olursa secrets sayfasına yönlendiriyoruz.
          });
        }
      });
    }
  } catch (err) {
    console.log(err); // Bir hata olursa logluyoruz.
  }
});

// Yerel kimlik doğrulama stratejisini tanımlıyoruz.
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      // Kullanıcının e-posta adresine göre veritabanından kullanıcıyı sorguluyoruz.
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        // Parolaları karşılaştırıyoruz.
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err); // Karşılaştırma hatası varsa logluyoruz.
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user); // Parola doğruysa kullanıcıyı geri döndürüyoruz.
            } else {
              return cb(null, false); // Parola yanlışsa kimlik doğrulama başarısız.
            }
          }
        });
      } else {
        return cb("User not found"); // Kullanıcı bulunamazsa hata döndürüyoruz.
      }
    } catch (err) {
      console.log(err); // Bir hata olursa logluyoruz.
    }
  })
);

// Google kimlik doğrulama stratejisini tanımlıyoruz.
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets", // Google kimlik doğrulaması sonrası yönlendirilecek URL.
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile); // Google profili verisini logluyoruz.
        // Kullanıcının e-posta adresine göre veritabanından kullanıcıyı sorguluyoruz.
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          // Kullanıcı yoksa yeni bir kullanıcı oluşturuyoruz.
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]); // Kullanıcı varsa onu geri döndürüyoruz.
        }
      } catch (err) {
        return cb(err); // Bir hata olursa geri döndürüyoruz.
      }
    }
  )
);

// Kullanıcıyı oturumda depolamak için serialize ve deserialize işlemleri.
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Sunucuyu belirtilen port üzerinde dinlemeye başlatıyoruz.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
