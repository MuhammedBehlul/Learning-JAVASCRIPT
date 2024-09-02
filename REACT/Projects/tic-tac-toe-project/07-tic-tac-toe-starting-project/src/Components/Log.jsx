export default function Log({ turns }) {
    return (
        <ol id="log">
            {turns.map((turn, index) => (
                <li key={index}>
                    {`${turn.player} - (${turn.row}, ${turn.cell})`}
                </li>
            ))}
        </ol>
    );
}