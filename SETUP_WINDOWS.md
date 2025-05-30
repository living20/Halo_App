# Hal0 Emergency Alert System - Windows Setup Guide

This guide will help you set up and run the Hal0 Emergency Alert mobile app on Windows.

## Prerequisites

Before getting started, make sure you have the following installed:

1. **Node.js** (LTS version recommended, 16.x or newer)
   - Download from: https://nodejs.org/

2. **Git** (optional, for version control)
   - Download from: https://git-scm.com/download/win

3. **Visual Studio Code** (recommended editor)
   - Download from: https://code.visualstudio.com/

## Setup Instructions

Follow these steps to set up and run the Hal0 mobile app:

### 1. Install Dependencies

Open PowerShell or Command Prompt in the project directory and run:

```powershell
# Install Expo CLI globally
npm install -g expo-cli

# Install project dependencies
npm install
```

### 2. Start the Development Server

After installing all dependencies, you can start the development server:

```powershell
# Start the Expo development server
npm start
```

Or alternatively:

```powershell
npx expo start
```

### 3. Running on a Device/Emulator

Once the development server is running, you have multiple options:

#### Option A: Run on Android Emulator

1. Install Android Studio and set up an Android Virtual Device (AVD)
2. Start your Android emulator
3. Press `a` in the terminal running Expo to open the app in the Android emulator

#### Option B: Run on iOS Emulator (requires macOS)

This option is not available on Windows directly. You would need a Mac for iOS development.

#### Option C: Run on a Physical Device

1. Install the Expo Go app on your device:
   - Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Scan the QR code shown in the terminal with:
   - Android: Use the Expo Go app to scan
   - iOS: Use the Camera app to scan

3. The app will open in Expo Go on your device

### 4. Access the Web Version

You can also run the app in a web browser by pressing `w` when the development server is running.

## Troubleshooting

### Common Issues and Solutions

1. **Port Already in Use**
   - Solution: Change the port by using `npx expo start --port 19001`

2. **Metro Bundler Issues**
   - Solution: Clear the cache with `npx expo start -c`

3. **Module Not Found Errors**
   - Solution: Ensure all dependencies are installed with `npm install`
   - If issues persist, try deleting `node_modules` folder and running `npm install` again

4. **Device Connection Issues**
   - Ensure your development machine and mobile device are on the same WiFi network
   - Try using the "tunnel" connection type: `npx expo start --tunnel`

## Building for Production

To create a production build for Android:

```powershell
# Build for Android
npx eas build -p android
```

Note: Building for iOS requires a Mac with Xcode installed.

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)

For any other issues or questions, please refer to the project documentation or contact the development team.
