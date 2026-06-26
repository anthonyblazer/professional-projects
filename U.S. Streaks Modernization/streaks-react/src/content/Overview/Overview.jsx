import React from "react";
import { motion } from "framer-motion";
import { useParameters } from "../Fetch";


//Loading screen
const loader = <div className="loader-overlay">
    <div className="noaa-header">
        <img alt="NOAA loader" src="https://www.ncei.noaa.gov/monitoring-content/lib/images/noaa-loader.gif"></img>
    </div>
</div>

//Framer motion variables
const parentBehave = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
        },
    },
};
const childBehave = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};


function Overview() {

    const parameters = useParameters();
    if (!parameters){
        return loader;
    }


    return (
        <div id="monitoring-content">

            <h2 id="section-title">Overview</h2>
            <p>
                NCEI tracks <a href="https://www.ncei.noaa.gov/products/land-based-station/global-historical-climatology-network-daily">GHCN-Daily</a> stations 
                that experience consecutive days with temperature and precipitation values which exceed or fall short of
                various thresholds ("<em>streaks</em>"). These streaks are updated with the most recent daily data available. There
                is a 2–4 day lag in data processing which can affect the length of a streak depicted on this site. Late
                arriving or missing data could result in "re-setting" a streak. Only stations with recent data (within 6 days of
                analyses) are included in this project. Users can self-investigate the thresholds on their own by selecting the
                station in question to access the daily station data. This product does not take into account station climatologies,
                so some locales may appear to be dry for long periods of time which could be typical for the season. "Normal"
                temperatures are based on the 1991-2020 climatological mean. Please visit the latest <a href="https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals">30-year Climate Normals</a> for 
                more information on station climatologies.
            </p>
            <p>
                One "unintended benefit" of this project is it has highlighted some stations that may inaccurately report missing
                precipitation data as "0.00" instead of "-9999". These erroneous data could appear as long streaks without
                precipitation in both historical and active stations. A general clean-up of these stations has taken place, but
                there could be more. Please notify <a href="mailto:ncei.monitoring.info@noaa.gov">NCEI.Monitoring.Info@noaa.gov</a> for 
                questions and comments.
            </p>

            <table>
                <caption>Streak Types</caption>
                <motion.tbody variants={parentBehave} initial="hidden" animate="show">
                    <tr>
                        <th>Code</th>
                        <th>Definition</th>
                    </tr>

                    {/** Create the remaining table rows from parameters.json */}
                    {Object.entries(parameters).map(([number, data]) =>(
                        <React.Fragment key={`${number}-${data.group}`}>
                            <motion.tr variants={childBehave}>
                                <td>{number}</td>
                                <td>Consecutive Days with {clean_deg(data.title)} {data.note ? <em>({data.note})</em> : ""}</td>
                            </motion.tr>
                        </React.Fragment>
                    ))}
                </motion.tbody>
            </table>
        </div>
    )

}


// Helper function: Replace &deg;F/C for desired syntax
function clean_deg(note){

    let fin = "";
    // replace &deg;F and &deg;C
    const str = note.replace("&deg;F", "°F");
    const str2 = str.replace("&deg;C", "°C");

    fin = str2;

    return fin;
    
}


export default Overview;
