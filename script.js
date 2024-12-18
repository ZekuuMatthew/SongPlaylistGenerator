function generatePlaylist() {
    const mood = document.getElementById('moodInput').value.trim().toLowerCase(); // Normalize the input
    const playlistContainer = document.getElementById('playlistContainer');

    // Clear previous results and hide container by default
    playlistContainer.innerHTML = "";
    playlistContainer.style.display = "none";

    setTimeout(() => {
        // Clear the loading message
        playlistContainer.innerHTML = "";

    // Hardcoded playlists
    const happySongs = [
        "Disco - Surf Curse",
        "Can't Stop the Feeling! - Justin Timberlake",
        "Good as Hell - Lizzo",
        "Uptown Funk - Mark Ronson ft. Bruno Mars",
        "Shut Up and Dance - WALK THE MOON",
        "Walking on Sunshine - Katrina and the Waves",
        "Shake It Off - Taylor Swift",
        "Sugar - Maroon 5",
        "Blinding Lights - The Weeknd",
        "Don't Stop Me Now - Queen",
        "Levitating - Dua Lipa ft. DaBaby",
        "Firework - Katy Perry",
        "On Top of the World - Imagine Dragons",
        "I Gotta Feeling - The Black Eyed Peas",
        "Best Day of My Life - American Authors",
        "Dynamite - BTS",
        "Roar - Katy Perry",
        "Sunflower - Post Malone, Swae Lee",
        "Dancing Queen - ABBA",
        "Celebration - Kool & The Gang",
        "Lovely Day - Bill Withers",
        "September - Earth, Wind & Fire",
        "Valerie - Amy Winehouse",
        "Treasure - Bruno Mars",
        "Here Comes the Sun - The Beatles",
        "Hey Ya! - OutKast",
        "Mr. Blue Sky - Electric Light Orchestra",
        "Sweet Caroline - Neil Diamond",
        "All Star - Smash Mouth",
        "Good Vibrations - The Beach Boys",
        "ABC - The Jackson 5",
        "Party Rock Anthem - LMFAO",
        "I Love It - Icona Pop ft. Charli XCX",
        "You Make My Dreams - Hall & Oates",
        "Surfin' U.S.A. - The Beach Boys",
        "Don't Worry, Be Happy - Bobby McFerrin",
        "Livin' la Vida Loca - Ricky Martin",
        "We Found Love - Rihanna ft. Calvin Harris",
        "I'm a Believer - The Monkees",
        "Good Time - Owl City, Carly Rae Jepsen",
        "Wake Me Up Before You Go-Go - Wham!",
        "What Makes You Beautiful - One Direction",
        "Wannabe - Spice Girls",
        "Happy Together - The Turtles",
        "Boom Clap - Charli XCX",
        "Dancing in the Moonlight - Toploader",
        "Bang Bang - Jessie J, Ariana Grande, Nicki Minaj",
        "Call Me Maybe - Carly Rae Jepsen",
        "Cheerleader - OMI",
        "Viva La Vida - Coldplay"
    ];
    


    const sadSongs = [
        "Someone Like You - Adele",
        "All I Want - Kodaline",
        "Fix You - Coldplay",
        "The Night We Met - Lord Huron",
        "Let Her Go - Passenger",
        "I Will Always Love You - Whitney Houston",
        "Yesterday - The Beatles",
        "Hurt - Johnny Cash",
        "Say Something - A Great Big World & Christina Aguilera",
        "Jar of Hearts - Christina Perri",
        "Dancing On My Own - Robyn",
        "When I Was Your Man - Bruno Mars",
        "The Scientist - Coldplay",
        "Tears in Heaven - Eric Clapton",
        "With or Without You - U2",
        "Skinny Love - Birdy",
        "Back to December - Taylor Swift",
        "Jealous - Labrinth",
        "Everybody Hurts - R.E.M.",
        "Stay With Me - Sam Smith",
        "Unchained Melody - The Righteous Brothers",
        "Creep - Radiohead",
        "Breathe Me - Sia",
        "All of Me - John Legend",
        "I Can't Make You Love Me - Bonnie Raitt",
        "Nothing Compares 2 U - Sinead O'Connor",
        "Shadow of the Day - Linkin Park",
        "Hallelujah - Jeff Buckley",
        "Goodbye My Lover - James Blunt",
        "How to Save a Life - The Fray",
        "Wrecking Ball - Miley Cyrus",
        "Someone You Loved - Lewis Capaldi",
        "Lost Without You - Freya Ridings",
        "Let Me Go - Hailee Steinfeld",
        "In the Arms of an Angel - Sarah McLachlan",
        "Boulevard of Broken Dreams - Green Day",
        "You Were Good To Me - Jeremy Zucker & Chelsea Cutler",
        "Slow Dancing in a Burning Room - John Mayer",
        "Lost Cause - Billie Eilish",
        "Gone - Lianne La Havas",
        "Boys Don't Cry - The Cure",
        "Bruises - Lewis Capaldi",
        "Give Me Love - Ed Sheeran",
        "Need You Now - Lady Antebellum",
        "Blue Ain't Your Color - Keith Urban",
        "Back to Black - Amy Winehouse",
        "Too Good at Goodbyes - Sam Smith",
        "If I Ain't Got You - Alicia Keys",
        "Let It Be - The Beatles",
        "Iris - The Goo Goo Dolls"
    ];
    

    const workoutSongs = [
        "Eye of the Tiger - Survivor",
        "Lose Yourself - Eminem",
        "Stronger - Kanye West",
        "We Will Rock You - Queen",
        "Can't Hold Us - Macklemore & Ryan Lewis",
        "Power - Kanye West",
        "Run the World (Girls) - Beyoncé",
        "Believer - Imagine Dragons",
        "Remember the Name - Fort Minor",
        "Stronger (What Doesn't Kill You) - Kelly Clarkson",
        "Harder Better Faster Stronger - Daft Punk",
        "Party Up (Up in Here) - DMX",
        "Bring Me to Life - Evanescence",
        "HUMBLE. - Kendrick Lamar",
        "Work - Rihanna ft. Drake",
        "Don't Stop the Music - Rihanna",
        "Born to Run - Bruce Springsteen",
        "Jump - Van Halen",
        "Till I Collapse - Eminem",
        "Wake Me Up - Avicii",
        "Let's Get It Started - The Black Eyed Peas",
        "Pump It - The Black Eyed Peas",
        "Work B**ch - Britney Spears",
        "Conga - Gloria Estefan",
        "WAP - Cardi B ft. Megan Thee Stallion",
        "Good as Hell - Lizzo",
        "All I Do is Win - DJ Khaled",
        "Body - Megan Thee Stallion",
        "Sicko Mode - Travis Scott",
        "Lose Control - Missy Elliott",
        "Fighter - Christina Aguilera",
        "High Hopes - Panic! at the Disco",
        "Gonna Fly Now (Rocky Theme) - Bill Conti",
        "Unstoppable - Sia",
        "My House - Flo Rida",
        "Trap Queen - Fetty Wap",
        "Turn Down for What - DJ Snake, Lil Jon",
        "Work It - Missy Elliott",
        "Physical - Dua Lipa",
        "Run Boy Run - Woodkid",
        "Good Feeling - Flo Rida",
        "The Greatest - Sia",
        "Waka Waka (This Time for Africa) - Shakira",
        "Uptown Funk - Mark Ronson ft. Bruno Mars",
        "Work Hard Play Hard - Wiz Khalifa",
        "Let Me Clear My Throat - DJ Kool",
        "Titanium - David Guetta ft. Sia",
        "Dark Horse - Katy Perry",
        "Get Low - Dillon Francis, DJ Snake",
        "Boom Boom Pow - The Black Eyed Peas",
        "Roar - Katy Perry"
    ];
    

    const iDontWantToBeSadSongs = [
        "Happy Together - The Turtles",
        "Born This Way - Lady Gaga",
        "Shake It - Metro Station",
        "Boom Clap - Charli XCX",
        "Call Me Maybe - Carly Rae Jepsen",
        "Pompeii - Bastille",
        "HandClap - Fitz and the Tantrums",
        "Cool Kids - Echosmith",
        "Sucker - Jonas Brothers",
        "Party in the U.S.A. - Miley Cyrus",
        "Bang Bang - Jessie J, Ariana Grande, Nicki Minaj",
        "Youngblood - 5 Seconds of Summer",
        "All the Small Things - Blink-182",
        "Classic - MKTO",
        "Come On Eileen - Dexys Midnight Runners",
        "Timber - Pitbull ft. Ke$ha",
        "The Greatest Show - Hugh Jackman, The Greatest Showman Ensemble",
        "Best Song Ever - One Direction",
        "Roar - Katy Perry",
        "Juice - Lizzo",
        "We Will Rock You - Queen",
        "Higher Love - Kygo, Whitney Houston",
        "Break My Stride - Matthew Wilder",
        "Adventure of a Lifetime - Coldplay",
        "No Tears Left to Cry - Ariana Grande",
        "SOS - Avicii",
        "The Nights - Avicii",
        "Wake Me Up Before You Go-Go - Wham!",
        "Don't Stop Believin' - Journey",
        "Footloose - Kenny Loggins",
        "Walking on Broken Glass - Annie Lennox",
        "September - Earth, Wind & Fire",
        "Let's Groove - Earth, Wind & Fire",
        "Lovely Day - Bill Withers",
        "Upside Down - Diana Ross",
        "Raspberry Beret - Prince",
        "Rock with You - Michael Jackson",
        "All Night Long (All Night) - Lionel Richie",
        "Celebration - Kool & The Gang",
        "Get Lucky - Daft Punk ft. Pharrell Williams",
        "Treasure - Bruno Mars",
        "Run the World (Girls) - Beyoncé",
        "Unstoppable - Sia",
        "Good Feeling - Flo Rida",
        "Happy Now - Kygo ft. Sandro Cavazza",
        "Dance the Night - Dua Lipa",
        "Feel It Still - Portugal. The Man",
        "Don't Start Now - Dua Lipa",
        "Born to Be Alive - Patrick Hernandez",
        "Stuck in the Middle with You - Stealers Wheel"
    ];
          

    // Determine the playlist to display
    let songsToDisplay = [];
    if (mood === "happy") {
        songsToDisplay = happySongs;
    } else if (mood === "sad") {
        songsToDisplay = sadSongs;
    } else if (mood === "workout") {
        songsToDisplay = workoutSongs;
    } else if (mood === "i dont want to be sad") {
        songsToDisplay = iDontWantToBeSadSongs;
    } else {
        // Show error message for invalid mood
        playlistContainer.innerHTML = `<p>No playlist available for mood: ${mood}</p>`;
        playlistContainer.style.display = "block";
        return; // Exit if no valid mood is found
    }

    const list = document.createElement('ul');
    list.classList.add('playlist');

    // Render the playlist
    songsToDisplay.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.classList.add('track');
        songElement.textContent = `${index + 1}. ${song}`; // Render song as text
        playlistContainer.appendChild(songElement);
    });

    // Show the container if there is content
    playlistContainer.appendChild(list); // Append the list to the container
        playlistContainer.style.display = "block";
    }, 4000); // Delay of 4000ms (4 seconds)
}

