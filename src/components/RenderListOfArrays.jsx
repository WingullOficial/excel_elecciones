import React, { useEffect, useState } from 'react'

export default function RenderListOfArrays({ list, numberOfDays }) {
    //list is an array containing arrays of 3 elements: [0] - DATE, [1] - ID, [2] - Dame
    //function that maps that list to a list of <p></p>
    const [listOfArrays, setListOfArrays] = useState(null);

    //function that:
    //deletes string after T
    //deletes " char from string
    //return string.substring(0, string.indexOf('T'));
    const formatDateToHuman = (string) => {
        let date = string.split('T')[0];
        date = date.split('"')[1];
        return date;
    }


    //function that:
    //sums 4years to a date and returns object date
    const addFourYears = (date) => {
        let newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() + 4);
        return newDate;
    }

    //function that:
    //creates empty array called filtered
    //gets a list of arrays which in first position contain a date
    //gets today date
    //gets the difference between the two dates
    //if the difference is less than numberOfDays, then add the array to filtered
    //return filtered
    const filterList = (list) => {
        console.log("About to filter a list until the following days: " + numberOfDays);
        const filtered = [];
        const today = new Date();

        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        const todayDateString = todayYear + '-' + todayMonth + '-' + todayDate;
        console.log(`Today's date is: ${todayDateString}`);
        const todayDateObject = new Date(todayDateString);
        const listOfArrays = list.filter(array => array[0] !== null);
        listOfArrays.forEach(array => {

            const date = array[0];
            if (date !== "VOTACIÓN") {
                console.log(`-----------Trying new entry: ${array}`);
                console.log(`Date: ${date}`);
                const dateObject = new Date(date);
                const difference = (addFourYears(dateObject).getTime() - todayDateObject.getTime()) / (1000 * 60 * 60 * 24);

                if (difference-1 <= numberOfDays && difference >= 0) {
                    console.log(`Adding array to filtered :)`);
                    array.push(difference);
                    filtered.push(array);
                }
                else {
                    console.log(`Skipping entry...`);
                }
            }
        }
        );
        return filtered;
    }

    useEffect(() => {
        if (list && Array.isArray(list)) setListOfArrays(filterList(list));
    }, [list, numberOfDays]);

    if (listOfArrays) {
        return (
            <div className="RenderListOfArrays">
                <h4>Elecciones en los próximos {numberOfDays} días: {listOfArrays.length}</h4>
                {listOfArrays.map((array, index) => {
                    return (
                        <div className="result" key={index}>
                            <h4>{array[2]}</h4>
                            <b>CIF: {array[1]}</b>
                            <section className="result-dateInfo">
                                <div>
                                    <p>Próximas elecciones: </p>
                                    <p>{formatDateToHuman(JSON.stringify(addFourYears(array[0])))}</p>
                                </div>
                                <div>
                                    <p>Últimas elecciones:</p>
                                    <p>{formatDateToHuman(JSON.stringify(array[0]))}</p>
                                </div>
                                <div>
                                    <p>Faltan </p>
                                    <strong>{Math.floor(array[3])} días</strong>
                                </div>
                            </section>
                        </div>
                    )
                })}
            </div>
        )
    }

    return null;
}
