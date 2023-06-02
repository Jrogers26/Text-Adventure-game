let hasPickedUpSword = false;

class room {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._linkedrooms = {};
        this._character = "";
        this._item =null;
    }
    
    get name() {
        return this._name;
    }

    get description() {
        return this._description
    }

    get character() {
        return this._character;
    }
    
    set description(description) {
        this._description = description;
    }

    set character(character) {
        this._character = character;
    }

    set item(item) {
        this._item = item;
    }

    describe() {
        return "You have entered " + this._name + " you can see " + this._description + ".";
    }

    getDetails() {
        const entries = Object.entries(this._linkedrooms)
        let details = []
        for (const [direction, room] of entries) {
           let text = "The " + room.name + " is to the " + direction + "."
           details.push(text)
        }
        return details
    }

    move(direction) {
        if(direction in this._linkedrooms) {
            return this._linkedrooms[direction];
        } else {
            alert("You can't go that way")
            return this;
        }
    }

    linkRooms(direction, roomToLink) {
        this._linkedrooms[direction] = roomToLink;
    }
}


class character {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._conversation = "";
    }
    set name(name) {
        this._name = name;
    }

    set description(description) {
        this._description= description;
    }

    set conversation(conversation) {
        this._conversation = conversation;
    }

    get name() {
        return this.name;
    }

    get description() {
        return this._description
    }

    get conversation() {
        return this._conversation;
    }

    describe() {
        return "Watch out its a " + this._name + " they are " + this._description;
    }

    converse() {
        return this._name + " says " + this._conversation;
    }
}

class item {
    constructor(name) {
        this._name = name;
        this._description = "";
    }

    set name(name) {
        this._name = name;
    }

    set description(description) {
        this._description = description;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description
    }

    describe() {
        return "The" + this._name + "is" + this._description;
    }
}





const MainRoom = new room("Main Room")
MainRoom.description = "A wide dark empty room with nothing but a couple of chests inside.";
const SecondRoom = new room("Storage Room")
SecondRoom.description = "A small room with just a single goblin inside and a small chest.";
const MiniBossRoom = new room("Mini Boss Room")
MiniBossRoom.description = "A large room with a hobgoblin inside and a large chest.";
const BossRoom = new room("Boss Room")
BossRoom.description = "A large gloomy room with troll inside and a enormous chest.";

const Sword = new item("Long Sword");
Sword.description = "A rusty long sword"

SecondRoom.item = new item(Sword)




MainRoom.linkRooms("north", BossRoom )
BossRoom.linkRooms("south", MainRoom)
MainRoom.linkRooms("east", SecondRoom)
SecondRoom.linkRooms("west", MainRoom)
MainRoom.linkRooms("west", MiniBossRoom)
MiniBossRoom.linkRooms("east", MainRoom)

const HobGoblin = new character("Hobgoblin");
HobGoblin.description = "A large mischievous creature.";
HobGoblin.conversation = "Gimme all your loot.";

MiniBossRoom.character = HobGoblin;

const Troll = new character("Troll");
Troll.description = "A ugly creature";
Troll.description = "DiE huMaN "

BossRoom.character = Troll;

function fight() {
    if (room.character._name === "Hobgoblin" && hasPickedUpSword) {
        alert("Well Done, you Have killed the Mini Boss!!")
        occupantMsg = "well Done, you Have killed the Mini Boss!!"
    } else if (room.character._name === "Hobgoblin" && !hasPickedUpSword) {
        alert("Better luck next time, you died.")
        occupantMsg = "Better luck next time, you died."
    }


    if (room._item === "Sword") {
        const btn = document.createElement("button");
        button.innerHTML = "Pick up the sword"
        button.classList.add("btn");
        document.body.appendChild(btn)
        btn.addEventListener("click",() => {
            hasPickedUpSword = true;
        })
    }
}

function displayRoomInfo(room) {
    let occupantMsg = "";
    if(room.character) {
        occupantMsg = room.character.describe() + room.character.converse();
    } else (
        occupantMsg = "The room is empty"
    )
    
    textContent = "<p>" + room.describe() + "</p>" + "<p>" + occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";

    document.getElementById("textarea").innerHTML = textContent
    document.getElementById("usertext").focus()
}

function startGame() {
    let currentRoom = MainRoom
    displayRoomInfo(currentRoom)

    const directions = ["north", "south", "east", "west"]

    document.addEventListener("keydown", function(event) {
        console.log(event)

        if (event.key === "Enter") {
            const command = document.getElementById("usertext").value
            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command.toLowerCase())
                document.getElementById("usertext").value = ""
                displayRoomInfo(currentRoom)
            } else {
                document.getElementById("usertext").value = ""
                alert("That is not a valid direction.")
            }
        }
    })
}

startGame()

