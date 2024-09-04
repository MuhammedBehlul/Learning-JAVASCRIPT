export default function Input() {
    return (
        <section id="user-input">
            <div className="input-group">
                <p>
                    <label htmlFor="initial-investment">Initial Investment:</label>
                    <input type="number" id="initial-investment" name="initial-investment" />
                </p>
                <p>
                    <label htmlFor="annual-investment">Annual Investment:</label>
                    <input type="number" id="annual-investment" name="annual-investment" />
                </p>
                <p>
                    <label htmlFor="interest-rate">Interest Rate:</label>
                    <input type="number" id="interest-rate" name="interest-rate" />
                </p>
                <p>
                    <label htmlFor="investment-years">Years:</label>
                    <input type="number" id="investment-years" name="investment-years" />
                </p>
            </div>
        </section>
    );
}