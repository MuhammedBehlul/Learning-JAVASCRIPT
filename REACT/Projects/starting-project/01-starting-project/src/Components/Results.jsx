import { calculateInvestmentResults, formatter } from "../util/investment";

export default function Results({ results }) {

    const resultData = calculateInvestmentResults(results);

    console.log(resultData);

    return (
        <table id="result" className="center">
            <thead className="center">
                <tr>
                    <th>Year</th>
                    <th>Interest</th>
                    <th>Value at Year End</th>
                    <th>Annual Investment</th>
                </tr>
            </thead>
            <tbody className="center">
                {resultData.map((data) => (
                    <tr key={data.year}>
                        <td>{formatter.format(data.year)}</td>
                        <td>{formatter.format(data.interest)}</td>
                        <td>{formatter.format(data.valueEndOfYear)}</td>
                        <td>{formatter.format(data.annualInvestment)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}