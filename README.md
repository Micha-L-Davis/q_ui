# Q UI

Q UI is a React interface to the [Space Traders API](https://spacetraders.io/) by Michanations\#1000 on Discord. Work in progress.

## Getting Started

1. Clone the repository
3. Within the repository root directory, edit the `.env.sample` file with your API token.
4. Rename `.env.sample` to `.env` 
5. Run `npm start`

## Using the System Viewer

The system viewer in its current form depends on the systems.json file found at https://api.spacetraders.io/v2/systems.json API endpoint. Please download the most recent copy of the file and place it in the /src/data directory of this repository.

To browse the galaxy, click on a system name from the left column. The system's waypoints will appear in the center column.  Click on a waypoint to see the waypoint's details.

You can filter the list of systems on the left by clicking on the buttons at the top of the screen.  Only systems that contain the features selected will populate the list. Clicking a selected button removes the filter.
