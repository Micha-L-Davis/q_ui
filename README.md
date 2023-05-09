# Q UI

A React interface to the [Space Traders API](https://spacetraders.io/). Work in progress.

## Getting Started

1. Clone the repository
3. Within the repository root directory, edit the `.env.sample` file with your API token.
4. Rename `.env.sample` to `.env` 
5. Run `npm start`

## Using the System Viewer

The system viewer in its current form depends on the systems.json file found at https://api.spacetraders.io/v2/systems.json API endpoint. Please download the most recent copy of the file and place it in the /src/data directory of this repository.

To browse the galaxy, click on a system name from the left column. The system's waypoints will appear in the center column.  Click on a waypoint to see the waypoint's details.
