# Avalanche React

An attempt to visualize [Avalanche](https://ipfs.io/ipfs/QmUy4jh5mGNZvLkjies1RWM4YuvJh5o2FYopNPVYwrRVGV)

Only `Slush` is implemented. Randomness is introduced through arbitrary delays in `SlushLoop`. 


We initialize the app with the following:
1. pick any two random nodes with initial values of `red` and `blue` i.e. start in equilibrium
2. run avalanche instance, let randomness decide the outcome 

You should restart to observe red/blue winning 

## Running

`npm start` runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
