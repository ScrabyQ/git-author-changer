# Git Configurator

**Git Configurator** is a command-line utility that simplifies changing the Git user configuration by allowing you to select the email and username from a pre-defined file.

## 📋 Features

- Dynamic loading of user data from a file.
- Easy Git author configuration via a terminal command.
- User-friendly interface for selecting a Git user.

## 🚀 Installation

### Requirements

- [Node.js](https://nodejs.org/) version 12.0 or higher
- [Git](https://git-scm.com/) installed on your system

### Install via npm

1. Clone the repository or download its contents:

   ```bash
   git clone <URL of your repository>
   cd chauthor
   ```

2. Install the utility:


    Globally:
    ```bash
    npm install -g
    ```

    Or local:
    ```bash
    npm link
    ```

## 📄 Data File Format

The data file should contain lines in the following format:

```
email|name
```

Example `data.txt` file:

```
test@gmail.com|John Doe
example@yahoo.com|Jane Smith
developer@company.com|Developer
```

## 🛠️ Usage

### 1. Set the data file

To start, specify the data file:

```bash
chauthor init ./data.txt
```

Note: The data file will be stored in memory, allowing you to use it for changing the Git user configuration.

### 2. Run the Git author switch process in your project
After setting the data file, you can update the Git user configuration:

```bash
chauthor run
```

Example:
```bash
$ chauthor run
Select a user for Git configuration:
1. test@gmail.com | John Doe
2. example@yahoo.com | Jane Smith
3. developer@company.com | Developer
Enter the user number: 2
Git configuration updated successfully:
user.email = example@yahoo.com
user.name  = Jane Smith
```
## 📦 Uninstallation

To remove the utility, run:

```bash
npm uninstall -g chauthor
```

## ⚙️ Configuration

If you encounter issues with npm paths, ensure the global npm path is added to your $PATH. You can check it using:

```bash
npm bin -g
```

If the path is missing, add it to your .bashrc or .zshrc:

```bash
export PATH=$PATH:$(npm bin -g)
```

## 🐛 Common Issues

### Error: `env: node\r: No such file or directory`

If you see the following error fix it by converting the file to Unix format:

```bash
dos2unix index.js
```

Or change the line endings in your editor to `LF`.

### Error: `fatal: not in a git directory`
Just run it in your project folder

## 📄 License

This project is licensed under the MIT License — see the [License](./LICENSE) file for details.

## 📞 Contact

If you have suggestions or encounter issues, please open a new issue in the repository or contact me via email.
