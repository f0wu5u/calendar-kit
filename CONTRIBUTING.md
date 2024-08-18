# Contributing to @arbta/calendar-kit

Thank you for considering contributing to this project!
We welcome all contributions, whether you're fixing bugs, adding features, improving documentation, or suggesting ideas.
### Table of Contents
<!-- TOC -->
* [Contributing to @arbta/calendar-kit](#contributing-to-arbtacalendar-kit)
  * [Getting Started](#getting-started)
  * [How to Contribute](#how-to-contribute)
    * [Reporting Issues](#reporting-issues)
    * [Submitting Code Changes](#submitting-code-changes)
    * [Writing Documentation](#writing-documentation)
    * [Suggesting Enhancements](#suggesting-enhancements)
  * [Style Guides](#style-guides)
    * [Code Style](#code-style)
    * [Commit Messages](#commit-messages)
  * [License](#license)
<!-- TOC -->

## Getting Started

1. Fork the repository: Click on the "Fork" button at the top right of this page.
2. Clone your fork:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
3. Create a branch: Create a new branch for your contribution.
    ```bash
    git checkout -b your-branch-name
    ```
4. Install dependencies: Run the following command to install the necessary dependencies.
    ```bash
    yarn install
    ```
5. Make your changes: Implement your `feature`, `fix`, or `improvement`.

6. Run tests: Ensure all tests pass before submitting.
    ```bash
    yarn test
    ```
## How to Contribute

### Reporting Issues
If you find a bug or have a feature request, please [Open an issue](https://github.com/arbta/calendar-kit/issues) with as much detail as possible. Include:
- A clear and descriptive title.
- Steps to reproduce the issue (if applicable).
- Expected vs. actual behavior.
- Screenshots, logs, or any other relevant information.

### Submitting Code Changes

1. Follow the code style: Ensure your code follows the project's coding style (see [Style Guides](#style-guides)).

2. Commit your changes: Write clear and concise commit messages (see [Commit Messages](#commit-messages)).
    ```bash
    git add .
    git commit -m "Your detailed description of the change."
    ```
3. Push to your fork:
    ```bash
    git push origin your-branch-name
    ```
4. Submit a pull request: Go to the original repository and submit a pull request (PR) from your branch. Please provide a detailed description of your changes and reference any related issues.

### Writing Documentation

Improving documentation is a great way to contribute! You can:

- Fix typos or improve grammar.
- Clarify instructions or descriptions.
- Add missing documentation for features or options.

Submit your documentation changes as a pull request.

### Suggesting Enhancements

We welcome ideas for new features! To suggest an enhancement:

1. [Open an issue](https://github.com/arbta/calendar-kit/issues) with your suggestion.
2. Describe the feature, why it would be useful, and how it could be implemented. 
3. Discuss the idea with maintainers and other contributors.

## Style Guides
### Code Style

- JavaScript/TypeScript: Follow the specific linter configurations provided in the project.
- React Native: Follow best practices for React Native, including component structure and state management.
- Testing: Write unit tests for new features and bug fixes using Jest or the project's preferred testing framework.

### Commit Messages

- Use the [Conventional Commits](https://www.conventionalcommits.org/) style for your commit messages.
- Format: `type(scope)`: subject
  - Example:
    - feat(component): add new calendar date picker
    - fix(api): resolve date parsing issue
    - docs(readme): update contributing guidelines

## License
By contributing to this project, you agree that your contributions will be licensed under the project's [MIT License](https://opensource.org/license/MIT).