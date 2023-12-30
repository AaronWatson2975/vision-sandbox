# Vision Sandbox

## Overview

Welcome to Vision Sandbox - a OpenAI Playground clone slapped together in a night designed to simplify interactions with the GPT-4 Vision model and text-based models like GPT-3.5. Created out of a desire to explore the capabilities of GPT-4 Vision without the direct use of the API or the constraints of the standard OpenAI playground, this playground clone provides enthusiasts and developers an effortless environment to engage in conversational AI powered by images and text.

<img width="1303" alt="Screenshot 2023-12-29 at 10 51 52 PM" src="https://github.com/AaronWatson2975/vision-sandbox/assets/36612616/63391cc3-06e0-4bf6-9ff3-fdff9947d7eb">


## Features

- **Real Time**: The conversation updates dynamically, so you can witness the AI responses as they’re generated, rather than waiting for the full response.
- **Image Conversations**: Easily add images to your conversation and let GPT-4 Vision model reveal its understanding and analysis of visual content.
- **Intuitive Layout**: The interface mirrors the familiar OpenAI Playground, featuring system prompts on the left, conversation history in the center, and model settings on the right.
- **Accessibility**: No complex setup required. Just NPM and a simple environment variable gets the system up and running.
- **Flexibility**: The model selector automatically updates with available models from the OpenAI API, ensuring you can see what you have access to (this is currently unfiltered so many unsupported models like TTS will likely appear as well).
- **GPT Model Support**: Though tailored for GPT-4 Vision, the interface supports text-based interactions with models such as GPT-3.5.

## Getting Started

To get Vision Sandbox up and running on your local machine, perform the following steps:

1. **Clone the Repository**
    
    ```
    git clone https://github.com/AaronWatson2975/vision-sandbox
    cd vision-sandbox
    ```
    
2. **Environment Setup**
Create a `.env` file in the root directory of the project and add the following line:
    
    ```
    REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
    ```
    
    Replace `your_openai_api_key_here` with your actual OpenAI API key.
    
3. **Install Dependencies**
    
    ```
    npm install
    ```
    
4. **Start the Application**
    
    ```
    npm start
    ```
    
5. Navigate to `http://localhost:3000` in your web browser to access the Vision Sandbox.

## Prerequisites

- Access to GPT-4 Vision. Ensure that you're qualified to use the image capabilities of OpenAI's latest models.
- An OpenAI API key. This is crucial for authenticating and enabling the services provided by the OpenAI models.

## Future Plans

- **Video Support**: Bring motion into the conversation by integrating video analysis capabilities.
- **TTS Support**: Although text-to-speech models can be selected, they almost certainly won’t work yet.
- **Bug/UX Fixes:** This was made very quickly just so I could play around with GPT-4 vision, as such it’s probably very buggy and there’s not shortage of UX improvements that could be made.

## Contributions

Vision Sandbox welcomes contributions from the developer community. Whether you're fixing a bug, adding a new feature, or improving documentation, your help is appreciated. To contribute, feel free to fork the repository, make your changes, and submit a pull request.

## Technology Stack

- **Create React App**: Serves as the foundational scaffolding for the interface.
- **Material-UI (MUI)**: A popular React UI framework that provides a suite of components for a smooth developer experience and an elegant user interface.

## Acknowledgements

This project is an individual effort to contribute to the AI community. With access to GPT-4 Vision (which I had no idea I had) but without a personal playground, the sense of initiative took me from zero to this very helpful tool.

For any questions, suggestions, or contributions, don't hesitate to reach out or open an issue in the repository.

## License

Licensed under the MIT License. See `LICENSE` file for more information.
