import React from 'react';

export default function Input({ onChange, formValues }) {
    return (
        <section id="user-input">
            <div className="input-group">
                <p>
                    <label htmlFor="initial-investment">Initial Investment:</label>
                    <input
                        type="number"
                        id="initial-investment"
                        name="initialInvestment"
                        value={formValues.initialInvestment}
                        onChange={(event) => onChange('initialInvestment', event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="annual-investment">Annual Investment:</label>
                    <input
                        type="number"
                        id="annual-investment"
                        name="annualInvestment"
                        value={formValues.annualInvestment}
                        onChange={(event) => onChange('annualInvestment', event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="expected-return">Expected Return (%):</label>
                    <input
                        type="number"
                        id="expected-return"
                        name="expectedReturn"
                        value={formValues.expectedReturn}
                        onChange={(event) => onChange('expectedReturn', event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration : </label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={formValues.duration}
                        onChange={(event) => onChange('duration', event.target.value)}
                    />
                </p>
            </div>
        </section>
    );
}
