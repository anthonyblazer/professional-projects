# State Climate Extremes Modernization Project.  

**Name:** State Climate Extremes Committee React. 

**Description:** The State Climate Extremes Committee (SCEC) is a committee formed to analyze and collect climate extremes across the Contiguous US, Hawaii, and Alaska. An affiliated application to view and learn about the SCEC and its records was created after the committee was formed. This led to the application being built uses comtemporary languages and frameworks, such as Javascript with JQuery/AJAX and PHP.  

As a Data Science Intern with thw National Oceanic and Atmospheric Administration (NOAA), who is the parent administration for the committee, I was tasked with updating this application using modern languages and/or frameworks. Provided in this directory is an incomplete architecture of the new application, primarily because this information, though not confidential, is managed by NOAA, thus final implementations are kept internally. 

Listed below are significant improvements/implementations that I made in modernizing the application. This is not cumulative but serves as a mean of highlighting major contributions made to the tool, as well as to the SCEC.

### Notable Improvements
1. The dynamic aspects of the applications are now completely managed by **React** and afiliated libraries/frameworks.
2. The application can now allow users to view previous records, not just current records - which can still be seen on the production site.
3. The application no longer requires PHP to fetch and parse JSON files needed to provided cliamte information. The application now uses React Hooks to manage any external information and handling.
5. PHP is no longer used in the management of file downloads - **Python's Fast API** is utilized for this task, but also allows users to view the files prior to download.
4. The application's major aspects now utilize component-based implementations. Aspects like headers, logos, and more have standalone files. This reduces the amount of logic in a singular file and provides easier debugging and documenting methods.


**To compare/view the current application to the one found in this directory, visit the official SCEC website:** https://www.ncei.noaa.gov/access/monitoring/scec/