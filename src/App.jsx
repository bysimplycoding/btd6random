import { useEffect, useState } from "react"

function App() {
  //monkeys
  const monkeys = {
    primary: [
      'Dart Monkey', 'Boomerang Monkey', 'Bomb Shooter', 'Tack Shooter', 'Ice Monkey', 'Glue Gunner'
    ],
    military: [
      'Sniper Monkey', 'Monkey Sub', 'Monkey Buccaneer', 'Monkey Ace', 'Heli Pilot', 'Dartling Gunner'
    ],
    magic: [
      'Wizard Monkey', 'Super Monkey', 'Ninja Monkey', 'Alchemist', 'Druid'
    ],
    support: [
      'Banana Farm', 'Spike Factory', 'Monkey Village', 'Engineer Monkey'
    ]
  }
  //mode
  const modes = {
    easy: [
      'Standard', 'Primary Only', 'Deflation'
    ],
    medium: [
      'Standard', 'Military Monkeys Only', 'Apopalypse', 'Reverse'
    ],
    hard: [
      'Standard', 'Magic Monkeys Only', 'Double HP MOABs', 'Half Cash', 'Alternate Bloon Rounds', 'Impoppable', 'CHIMPS'
    ]
  }
  //map
  const maps = {
    beginner: [
      'Monkey Meadow', 'Tree Stump', 'Town Center', 'Scrapyard', 'The Cabin', 'Resort', 'Skates', 'Lotus Island', 'Candy Falls', 'Winter Park', 'Carved', 'Park Path', 'Alpine Run', 'Frozen Over', 'In the Loop', 'Cubism', 'Four Circles', 'Hedge', 'End of the Road', 'Logs'
    ],
    intermediate: [
      'Quarry', 'Quiet Street', 'Bloonarius Prime', 'Balance', 'Encrypted', 'Bazaar', 'Adora\'s Temple', 'Spring Spring', 'KartsNDarts', 'Moon Landing', 'Haunted', 'Downstream', 'Firing Range', 'Cracked', 'Streambed', 'Chutes', 'Rake', 'Spice Islands'
    ],
    advanced: [
      'Sunken Columns', 'X Factor', 'Mesa', 'Geared', 'Spillway', 'Cargo', 'Pat\'s Pond', 'Peninsula', 'High Finance', 'Another Brick', 'Off the Coast', 'Cornfield', 'Underground'
    ],
    expert: [
      'Sanctuary', 'Ravine', 'Flooded Valley', 'Infernal', 'Bloody Puddles', 'Workshop', 'Quad', 'Dark Castle', 'Muddy Puddles', '#OUCH'
    ]
  }
  //hero
  const heroes = [
    'Quincy', 'Gwendolin', 'Striker Jones', 'Obyn Greenfoot', 'Geraldo', 'Churchill', 'Benjamin', 'Ezili', 'Pat Fusty', 'Adora', 'Admiral Brickell', 'Etienne', 'Sauda', 'Psi'
  ]
  
  //random states
  const [randomMonkey, setRandomMonkey] = useState('')
  const [randomMode, setRandomMode] = useState('')
  const [randomMap, setRandomMap] = useState('')
  const [randomHero, setRandomHero] = useState('')
  
  //array of last six towers
  const [lastFive, setLastFive] = useState([])

  //array of last five towers
  const [realFive, setRealFive] = useState([])

  //base randomfunction (takes version because idk how to check which function gets passed)
  const randomMFunction = (arr , us, version) => {
    //pull list of keys to randomize which category to pull value from
    const keys = Object.keys(arr)
    //initialize random key
    let ranKey
    //specified monkey modes
    if (version === 'monkey') {
      switch(randomMode) {
        case 'Military Monkeys Only':
          ranKey = 'military'
          break;
        case 'Magic Monkeys Only':
          ranKey = 'magic'
          break;
        case 'Primary Only':
          ranKey = 'primary'
          break;
        default:
          ranKey = keys[Math.floor(Math.random() * keys.length)]
          break;
        }
        //use random key and use random value
        const ranValue = arr[ranKey][Math.floor(Math.random() * arr[ranKey].length)]
        if (ranValue === randomMonkey) {
          randomMFunction(monkeys, setRandomMonkey, 'monkey')
          console.log('same monkey rerolling ', ranValue)
        } else {
          //set random value
          us(t => t = ranValue)
          //add to last five array
          setLastFive(t => [...t, ranValue])
        }
    }
    //heroes doesn't use subcategories
    else if (version === 'heroes') {
      const ranValue = arr[Math.floor(Math.random() * arr.length)]
      us(t => t = ranValue)
    }
    //the other settings have subcategories
    else {
      ranKey = keys[Math.floor(Math.random() * keys.length)]
      const ranValue = arr[ranKey][Math.floor(Math.random() * arr[ranKey].length)]
      us(t => t = ranValue)
    }
  }

  //randomize others function
  const randomAll = () => {
    randomMFunction(modes, setRandomMode, 'modes')
    randomMFunction(maps, setRandomMap, 'maps')
    randomMFunction(heroes, setRandomHero, 'heroes')
  }

  //when specific monkey categories appear, update top monkey **need to clear array somehow
  useEffect(() => {
    if (['Military Monkeys Only', 'Magic Monkeys Only', 'Primary Only'].includes(randomMode)){
      const filter = function (type) {
        setLastFive(lastFive.filter(t => monkeys[type].includes(t)))
      }
      switch (randomMode) {
        case 'Military Monkeys Only':
          filter('military')
          break;
        case 'Magic Monkeys Only':
          filter('magic')
          break;
        case 'Primary Only':
          filter('primary')
          break;
      }
      randomMFunction(monkeys, setRandomMonkey, 'monkey')
    }
  }, [randomMode])

  useEffect(() => {
    //if last five reaches 5, remove first element let useEffect handle only modes
    if (lastFive.length > 3) {
      setLastFive(t => t.slice(1))
    }
  }, [lastFive])

  //checking last five
  useEffect(() => {
    if (lastFive.length === 4) {
      setRealFive(lastFive.slice(1))
    } else {
      setRealFive(lastFive)
    }
  }, [lastFive])

  let id = 0

  return (
    <div>
      <h1>{ randomMonkey || 'Click \'New Tower\'' }</h1>
      <button onClick={ () => randomMFunction(monkeys, setRandomMonkey, 'monkey') }>New Tower</button>
      <ul>
        {
          realFive.map(t => {
            return <li key={ id++ }>{ t }</li>
          })
        }
      </ul>
      <br/><button onClick={ randomAll }>Randomize Others</button>
      <h1>{ randomMode || 'Click \'New Mode\'' }</h1>
      <button onClick={ () => randomMFunction(modes, setRandomMode, 'modes') }>New Mode</button>
      <h1>{ randomMap || 'Click \'New Map\'' }</h1>
      <button onClick={ () => randomMFunction(maps, setRandomMap, 'maps') }>New Map</button>
      <h1>{ randomHero || 'Click \'New Hero\'' }</h1>
      <button onClick={ () => randomMFunction(heroes, setRandomHero, 'heroes') }>New Hero</button>
    </div>
  )
}

export default App;