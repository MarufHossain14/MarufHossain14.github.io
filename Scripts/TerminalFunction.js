// All previous outputs from commands and such
let OutputsText = "";
// Lets user scroll through the past outputs
let ScrollOffset = 0;

// String to store the current text input
let InputText = "";
// Dictionary to store info about the text blinker
let Blinker = { Index: 0, Time: Date.now() * 0.001 };

// Current directory
let Directory = "C:/Users/guest";

// Stores weather to render plasma or normal terminal
let DisplayPlasma = false;

// Function to give text for rendering
function GetText() {
  // Text to be displayed
  let FinalText = "";

  if (Time < 5 || OutputsText.split("\n").length < 19) {
    // If in boot sequence
    BootSequence();
    FinalText = OutputsText;
  } else if (!DisplayPlasma) {
    // If not in boot sequence
    // Trim the previous output to be displayed
    let Lines = OutputsText.split("\n");
    FinalText += Lines.slice(
      ScrollOffset,
      Math.min(ScrollOffset + 30, Lines.length)
    ).join("\n");

    // Check if command input is on screen
    if (ScrollOffset + 30 >= Lines.length) {
      if ((Date.now() * 0.001 - Blinker.Time) % 1 < 0.5) {
        // Show blinker
        FinalText += `${Directory}> ${InputText.slice(
          0,
          Blinker.Index
        )}█${InputText.slice(Blinker.Index + 1, InputText.length)}`;
      } // Dont show blinker
      else {
        FinalText += `${Directory}> ${InputText}`;
      }
    }
  } else {
    return GetTextPlasma();
  }

  return FinalText;
}

// Function to handle key press and text input
function KeyPressed(key) {
  if (DisplayPlasma) {
    if (key === "Escape") {
      DisplayPlasma = false;
    }
  } else if (Time > 5) {
    let LinesCount = OutputsText.split("\n").length;

    if (key.length === 1 && InputText.length + Directory.length + 3 < 55) {
      // Add character
      InputText =
        InputText.slice(0, Blinker.Index) +
        key.toLowerCase() +
        InputText.slice(Blinker.Index, InputText.length);
      Blinker = { Index: Blinker.Index + 1, Time: Date.now() * 0.001 }; // Update blinker pos and reset its time
      if (ScrollOffset < LinesCount - 30) {
        ScrollOffset = Math.max(0, LinesCount - 30);
      } // Reset the scroll if off screen
    } else if (key === "Backspace" && InputText && Blinker.Index > 0) {
      // Remove character
      InputText =
        InputText.slice(0, Blinker.Index - 1) +
        InputText.slice(Blinker.Index, InputText.length);
      Blinker = { Index: Blinker.Index - 1, Time: Date.now() * 0.001 }; // Update blinker pos and reset its time
      if (ScrollOffset < LinesCount - 30) {
        ScrollOffset = Math.max(0, LinesCount - 30);
      } // Reset the scroll if off screen
    } else if (key === "ArrowLeft") {
      // Move blinker left
      Blinker = {
        Index: Math.max(0, Blinker.Index - 1),
        Time: Date.now() * 0.001,
      };
    } else if (key === "ArrowRight") {
      // Move blinker right
      Blinker = {
        Index: Math.min(InputText.length, Blinker.Index + 1),
        Time: Date.now() * 0.001,
      };
    } else if (key === "ArrowUp") {
      // Scroll text upwards
      ScrollOffset = Math.max(0, ScrollOffset - 1);
    } else if (key === "ArrowDown") {
      // Scroll text downwards
      ScrollOffset = Math.min(LinesCount - 1, ScrollOffset + 1);
    } else if (key === "Tab") {
      // Auto complete
      AutoComplete(); // Complete input text
      Blinker = { Index: InputText.length, Time: Date.now() * 0.001 }; // Update blinker pos and reset its time
      if (ScrollOffset < LinesCount - 30) {
        ScrollOffset = Math.max(0, LinesCount - 30);
      } // Reset the scroll if off screen
    } else if (key === "Enter") {
      // Submit text
      OutputsText += `${Directory}> ${InputText}\n`;
      ExecuteCommand();

      InputText = "";
      Blinker = { Index: 0, Time: Date.now() * 0.001 };

      LinesCount = OutputsText.split("\n").length;
      if (ScrollOffset < LinesCount - 30) {
        ScrollOffset = Math.max(0, LinesCount - 30);
      }
    }
  }
}

function BootSequence() {
  let outputText = "";
  const loadingChars = ["-", "\\", "|", "/"];
  const asciiLogo = [
    " __  __          _____  _    _ ______ _    _ ",
    "|  \\/  |   /\\   |  __ \\| |  | |  ____| |  | |",
    "| \\  / |  /  \\  | |__) | |  | | |__  | |__| |",
    "| |\\/| | / /\\ \\ |  _  /| |  | |  __| |  __  |",
    "| |  | |/ ____ \\| | \\ \\| |__| | |   _| |  | |",
    "|_|  |_/_/    \\_\\_|  \\_\\\\____/|_|  (_)_|  |_|",
    "                                             ",
    "                                             ",
  ];

  // Show ASCII logo progressively
  for (let i = 0; i < asciiLogo.length; i++) {
    if (Time > 0.1 * (i + 1)) {
      outputText += asciiLogo[i] + "\n";
    }
  }
  if (Time > 1.3) {
    outputText += "\n\n";
  }

  // Boot messages
  if (Time > 1.4) {
    outputText += "Welcome to MarufOS 1.0.0 x86_64\n";
  }
  if (Time > 1.5) {
    outputText += "Type 'help' to list available commands\n\n\n";
  }

  // Loading animation (Time between 1.7 and 3.7)
  if (Time > 1.7 && Time <= 3.7) {
    const spinnerIndex = Math.floor((Time * 10) % 4);
    const percentLoaded = Math.min(100, Math.floor((Time - 1.7) / 0.02));
    outputText += `Loading ${loadingChars[spinnerIndex]} ${percentLoaded}%\n`;
  }

  // Final dots and completion
  if (Time > 3.7) {
    outputText += ".\n";
  }
  if (Time > 3.8) {
    outputText += ".\n";
  }
  if (Time > 3.9) {
    outputText += ".\n";
  }
  if (Time > 4.0) {
    outputText += "Complete!\n\n";
  }

  // Adjust scroll offset safely
  ScrollOffset = Math.min(outputText.split("\n").length - 1, ScrollOffset);

  OutputsText = outputText;
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// File system structure (unchanged)
const FileSystem = {
  root: {
    type: "directory",
    contents: {
      projects: {
        type: "directory",
        contents: {
          "projects.txt": {
            type: "file",
            content:
              "Here are a few projects I've worked on over the years. Some are complete, others are still in progress or paused as I picked up new interests or improved my skills. Each one has taught me something valuable, and I often revisit older work to refine it as I grow as a developer.",
          },
          "md5-security-demo.lnk": {
            type: "link",
            content: "https://github.com/maruf-hossain/md5-security-demo",
          },
        },
      },

      "about.txt": {
        type: "file",
        content:
          "I'm a developer who loves building purposeful tools. I started with side projects and grew into web, embedded, and AI work. I enjoy learning by doing and am most confident in Python, C, and JavaScript.",
      },
      "experience.txt": {
        type: "file",
        content:
          "I’ve worked on real-world projects—from full-stack apps to AI and automation—using Python, JavaScript, C++, and C#. I enjoy solving problems, learning quickly, and building things that matter.",
      },
      "plasma.exe": { type: "executable", content: "plasma" },
    },
  },
};

function ListFiles() {
  // Move to current folder
  let DirectoryContents = FileSystem.root;
  for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {
    DirectoryContents = DirectoryContents.contents[Dir];
  }

  // Print directory being listed
  OutputsText += `\nC:/../${Directory.split("/").slice(-1)}`;

  // Print each file
  const Files = Object.keys(DirectoryContents.contents);
  for (let [Index, File] of Files.entries()) {
    OutputsText += `\n${Index == Files.length - 1 ? "┗" : "┣"}${
      File.includes(".") ? "━▷" : "━━━━"
    } ${File}`;
  }

  OutputsText += "\n\n";
}

function ChangeDirectory(InputDirectory) {
  let CurrentDirectory = Directory.slice(15).split("/").filter(Boolean);

  // Go back a folder
  if (InputDirectory === "..") {
    CurrentDirectory.pop();
  }

  // Return to root folder
  else if (InputDirectory === "/") {
    CurrentDirectory = [];
  }

  // Move to new folder
  else {
    // Move to current folder
    let DirectoryContents = FileSystem.root;
    for (let Dir of CurrentDirectory) {
      DirectoryContents = DirectoryContents.contents[Dir];
    }

    // Add new folder to path
    if (
      DirectoryContents.contents[InputDirectory] &&
      DirectoryContents.contents[InputDirectory].type === "directory"
    ) {
      CurrentDirectory.push(InputDirectory);
    }

    // Desired path dousnt exist
    else {
      OutputsText += `\ncd: '${InputDirectory}' No such directory\n\n`;
      return;
    }
  }

  Directory = `C:/Users/guest${
    CurrentDirectory.length ? "/" : ""
  }${CurrentDirectory.join("/")}`;
}

function StartFile(InputFile) {
  // Move to current folder
  let DirectoryContents = FileSystem.root;
  for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {
    DirectoryContents = DirectoryContents.contents[Dir];
  }

  // Perform action based on what file is opened
  if (
    DirectoryContents.contents[InputFile] &&
    DirectoryContents.contents[InputFile].type === "file"
  ) {
    OutputsText += `\n${DirectoryContents.contents[InputFile].content}\n\n`;
  } else if (
    DirectoryContents.contents[InputFile] &&
    DirectoryContents.contents[InputFile].type === "link"
  ) {
    OutputsText += `\nRedirecting to '${DirectoryContents.contents[InputFile].content}'\n\n`;
    window.open(DirectoryContents.contents[InputFile].content);
  } else if (
    DirectoryContents.contents[InputFile] &&
    DirectoryContents.contents[InputFile].type === "executable"
  ) {
    OutputsText += `\n'${InputFile}' Started successfully\n\n`;
    DisplayPlasma = true;
  }

  // Selected file dousnt exist
  else {
    OutputsText += `\nstart: '${InputFile}' No such file\n\n`;
  }
}

// Modified ExecuteCommand function
function ExecuteCommand() {
  const [Command, ...Arguments] = InputText.split(" ");

  if (Command) {
    ComputerBeep.play();
    ComputerBeep.currentTime = 0;
  }

  switch (Command) {
    case "ls":
      if (Arguments.length) {
        OutputsText += "\nError: 'ls' doesn't accept any arguments\n\n";
      } else {
        ListFiles();
      }
      break;

    case "cd":
      if (Arguments.length > 1) {
        OutputsText +=
          "\nError: 'cd' doesn't accept more that one argument\n\n";
      } else {
        ChangeDirectory(Arguments[0]);
      }
      break;

    case "start":
      if (Arguments.length > 1) {
        OutputsText +=
          "\nError: 'start' doesn't accept more that one argument\n\n";
      } else {
        StartFile(Arguments[0]);
      }
      break;

    case "clear":
      if (Arguments.length) {
        OutputsText += "\nError: 'clear' doesn't accept any arguments\n\n";
      } else {
        BootSequence();
      }
      break;

    case "help":
      if (Arguments.length) {
        OutputsText += "\nError: 'help' doesn't accept any arguments\n\n";
      } else {
        OutputsText +=
          "\nPress 'tab' for auto complete and press 'esc' to exit\na program (.exe file)\n\nLS       Lists current directory contents\nCD       Change directory, '..' moves back, '/' to root\nSTART    Opens specified file in current directory\nCLEAR    Clears all previous terminal outputs\n\n";
      }
      break;

    case "":
      break;

    default:
      OutputsText += `\nCommand not found '${Command}'\n\n`;
  }
}

// Autocomplete function
function AutoComplete() {
  const [Command, ...Arguments] = InputText.split(" ");
  const CommandsList = ["ls", "cd", "start", "clear"];

  // Auto completing a command
  if (!Arguments.length) {
    const CompletededCommand = CommandsList.filter((Element) =>
      Element.startsWith(Command)
    );
    if (CompletededCommand.length) {
      InputText = CompletededCommand[0];
    }
  }

  // Auto comepleting a file name
  if (["cd", "start"].includes(Command) && Arguments.length < 2) {
    // Move to current folder
    let DirectoryContents = FileSystem.root;
    for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {
      DirectoryContents = DirectoryContents.contents[Dir];
    }

    // Possible file names
    const PossibleCompletions = Object.keys(DirectoryContents.contents).filter(
      (Item) => Item.startsWith(Arguments)
    );
    if (PossibleCompletions.length) {
      InputText = `${Command} ${PossibleCompletions[0]}`;
    }
  }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

function GetTextPlasma() {
  const Letters = [
    " ",
    "_",
    "a",
    "b",
    "c",
    "ö",
    "õ",
    "ö",
    "#",
    "$",
    "%",
    "1",
    "2",
    "3",
    "A",
    "B",
    "C",
  ];
  let Text = "";

  for (let Row = 1; Row < 31; Row++) {
    for (let Col = 1; Col < 56; Col++) {
      const Intensity = GetIntensityPlasma(Row / 30, Col / 55);
      Text +=
        Letters[
          Math.max(Math.min(Math.floor(Intensity) - 1, Letters.length - 1), 0)
        ];
    }

    Text += "\n";
  }

  return Text;
}

function GetIntensityPlasma(Row, Col) {
  let Intensity = 0.0;

  Intensity += 0.7 * Math.sin(0.5 * Row + Time / 5);
  Intensity += 3 * Math.sin(1.6 * Col + Time / 5);
  Intensity +=
    1 *
    Math.sin(
      10 * (Col * Math.sin(Time / 2) + Row * Math.cos(Time / 5)) + Time / 2
    );

  const CyclicX = Row + 0.5 * Math.sin(Time / 2);
  const CyclicY = Col + 0.5 * Math.cos(Time / 4);

  Intensity +=
    0.4 *
    Math.sin(Math.sqrt(100 * CyclicX ** 2 + 100 * CyclicY ** 2 + 1) + Time);
  Intensity +=
    0.9 * Math.sin(Math.sqrt(75 * CyclicX ** 2 + 25 * CyclicY ** 2 + 1) + Time);
  Intensity +=
    -1.4 *
    Math.sin(Math.sqrt(256 * CyclicX ** 2 + 25 * CyclicY ** 2 + 1) + Time);
  Intensity += 0.3 * Math.sin(0.5 * Col + Row + Math.sin(Time));

  return (
    17 * (0.5 + 0.499 * Math.sin(Intensity)) * (0.7 + Math.sin(Time) * 0.3)
  );
}
