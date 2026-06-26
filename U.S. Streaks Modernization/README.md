# U.S. Streaks Modernization Project.  

**Name:** U.S. Streaks React. 

**Description:** "Streaks" refers the length a climate event took place, such as "Oneonta, Alabama had a 60 day streak of No Precipitation" (this is an actual record). Thus, the U.S. Streaks project was created to synthesize and visualize streaks for various climate event types across the Contiguous U.S., Hawaii, and Alaska. Similar to SCEC (see *State Climate Exremes Committee Modernization Project* directory), this application was built using relevant languages at the time of creation, such as Javascript with JQuery/AJAX, PHP, and leaflet.

As a Data Science Intern with thw National Oceanic and Atmospheric Administration (NOAA), who's product this is, I was tasked with updating this application using modern languages and/or frameworks. Provided in this directory is an incomplete architecture of the new application, primarily because this information, though not confidential, is managed by NOAA, thus final implementations are kept internally. 

Provided below are significant improvements/implementations that I made in modernizing the application. This is not cumulative but serves as a mean of highlighting contributions made to the tool.

### Notable Improvements
1. The application no longer requires PHP to fetch and parse JSON files needed to provided climate information. This application now uses **Tanstack Query**, a state management library that improves caching, fetching, and state update efficiency. Tanstack Query has allowed the application to do almost all PHP rendering and fetching logic on the front-end at almost *1/2 the speed!*
2. The application has offloaded the PHP-generated dynamic table to an external library, **Tanstack Table**. This stellar library is a headless UI table management tool that allows the application to outsource functionalities like sorting, filtering, and grouping that would otherwise need to be self-programmed. 
3. The application is now using a *brand new* concept for the Climate Monitoring products - table virtualization. Virtualization is simply generating only the pieces of the UI that are relevant. Traditionally, a React/HTML table will generate every table row, but in virtualization. only the rows needed to fill the container are. Here, climate data can be hundreds of rows big, which can (and did) slow front-end table generation. Now, using **Tanstack Virtual**, the application offloads generation load from the DOM, allowing the application to generate the table.
4. The dynamic aspects of the applications are now completely managed by **React** and afiliated libraries/frameworks.
5. The application's major aspects now utilize component-based implementations. Aspects like headers, logos, and more have standalone files. This reduces the amount of logic in a singular file and provides easier debugging and documenting methods.
6. The application has shifted from imperative Leaflet and now uses Leaflet's new component-based version, **React Leaflet**. This provides the same functionality/visibility as the imperative version but cleaner, easier-to-debug file management.
