SincPoint is a logical clock simulator that uses the Berkeley Algorithm for clock synchronization. With this application, you can add computers with different times and automatically synchronize them to align them based on an average time calculation.
# Figure 1
![animation](https://github.com/WilckerNeckel/sinc-point/tree/main/Images/1.png)

## Features

- Add computers with custom IPs and times.
- Display the current time of each computer in the interface.
- Possibility to move a computer card
- Possibility to delete a computer
- Synchronize times using the **Berkeley Algorithm**, adjusting for time differences between computers.
- Interactive and responsive interface for a user-friendly experience on any device.
- CC BY 4.0.

## Technologies Used

- **React**: Main library for building the interface.
- **Material-UI**: Component styling and responsive layout.
- **Day.js**: Date and time manipulation.
- **Vite**: Fast and efficient build tool.

## How it Works

1. **Add Computers**:
- Enter an IP and a custom time for each computer.
# Figure 2
![animation](https://github.com/WilckerNeckel/sinc-point/raw/master/Imagens/2-0.png)
- Each computer is displayed as a card in the interface.
# Figure 3
![animation](https://github.com/WilckerNeckel/sinc-point/raw/master/Imagens/2.png)
2. **Synchronize Times**:
- Click the **Synchronize** button.
# Figure 4
![animation](https://github.com/WilckerNeckel/sinc-point/raw/master/Imagens/3.png)
- The Berkeley Algorithm calculates the average time between all clocks and adjusts the times of each computer automatically.
# Figure 5
![animation](https://github.com/WilckerNeckel/sinc-point/raw/master/Imagens/4.png)
3. **Dynamic Interface**:
- The time adjustments are displayed on each computer for a few seconds after synchronization.

## How to Run the Project Locally

1. Clone the repository:

```bash
git clone <REPOSITORY_URL>
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Access the application in the browser at: [http://localhost:5173](http://localhost:5173)

## Link to Deploy

You can access the hosted application through the link below:

[**SincPoint - Logical Clock Simulator**](https://sincpoint.nexsyn.com.br)

## Project Structure

- **/src**
- **components**: Reusable components such as ComputerCard, ServerClock, and ComputerGrid.
- **contexts**: Global contexts such as notifications. - **assets**: Images and icons used in the application.
- **App.jsx**: Main point of the application.

## Berkeley Algorithm

The Berkeley Algorithm is used for clock synchronization in distributed systems. The central server calculates the average time based on the times sent by the clients and adjusts the clocks proportionally.

In the application, the implementation works as follows:

1. The times of each computer are sent to the server.
2. The server calculates the clocks' and average time difference.
3. Each computer receives a proportional adjustment for synchronization.
