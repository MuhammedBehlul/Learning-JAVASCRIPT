import { calculateInvestmentResults } from "../util/investment";

export default function Results({ results }) {

    const resultData = calculateInvestmentResults(results);

    console.log(resultData);

    return (

        <>Results...</>
    );
}