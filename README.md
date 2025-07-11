# Maruf Hossain - Developer Portfolio

A sophisticated, interactive portfolio showcasing advanced web development skills through a unique retro computer terminal aesthetic with real-time 3D graphics.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![WebGL](https://img.shields.io/badge/WebGL-2.0-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![CSS](https://img.shields.io/badge/CSS3-Advanced-orange)

## 🌟 Features

### 🎮 Interactive 3D Environment

- **Real-time WebGL2 rendering** with custom vertex and fragment shaders
- **Advanced lighting system** including directional, ambient, and specular lighting
- **Shadow mapping** with Percentage Closer Filtering (PCF) for realistic shadows
- **Mouse-controlled camera** with smooth rotation and decay
- **Dynamic text rendering** on 3D monitor screen with scanline effects

### 🎨 Retro Terminal Aesthetic

- **Authentic CRT monitor effects** including scanlines, noise, and screen glow
- **Green terminal text** with real-time text scrambling animations
- **Computer ambient sounds** with fade in/out transitions
- **Interactive keyboard sounds** for enhanced immersion
- **Smooth state transitions** between modern and retro views

### 💻 Modern Web Features

- **Responsive design** with high DPI display support
- **Cross-platform compatibility** with Mac-specific optimizations
- **Progressive enhancement** with graceful fallbacks
- **Accessibility features** including keyboard navigation
- **Performance optimized** with efficient rendering loops

## 🚀 Live Demo

**[View Live Portfolio](https://marufhossain14.github.io/)**

## 🛠️ Technology Stack

### Core Technologies

- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling with custom properties and animations
- **JavaScript ES6+** - Modern JavaScript with async/await and modules
- **WebGL2** - Hardware-accelerated 3D graphics

### Graphics & Rendering

- **Custom GLSL Shaders** - Vertex and fragment shaders for advanced lighting
- **Shadow Mapping** - Real-time shadow rendering with PCF
- **Canvas API** - Dynamic text rendering and texture generation
- **Matrix Mathematics** - Custom matrix operations for 3D transformations

### Audio & Interactivity

- **Web Audio API** - Dynamic audio playback and volume control
- **Event Handling** - Advanced mouse and keyboard input management
- **Animation API** - Smooth transitions and effects

## 🎯 Key Technical Achievements

### Advanced WebGL Implementation

- **Custom Shader Pipeline**: Implemented complex lighting calculations in GLSL
- **Shadow Mapping**: Real-time shadow rendering with bias and PCF filtering
- **Texture Management**: Dynamic texture generation for real-time text rendering
- **Performance Optimization**: Efficient buffer management and rendering loops

### Interactive Features

- **Real-time Text Effects**: Dynamic text scrambling with character substitution
- **Audio Integration**: Seamless audio playback with user interaction handling
- **Responsive Controls**: Mouse and keyboard input with smooth camera movement
- **State Management**: Clean transitions between different application states

### Cross-Platform Compatibility

- **Mac Optimization**: High DPI display support and Safari compatibility
- **Audio Autoplay Handling**: Proper user interaction requirements
- **WebGL Fallbacks**: Graceful degradation for unsupported browsers
- **Performance Tuning**: Optimized for various hardware configurations

## 🚀 Getting Started

### Prerequisites

- Modern web browser with WebGL2 support
- Local web server (for development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/maruf-hossain/portfolio.git
   cd portfolio
   ```

2. **Start a local server**

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Development

The portfolio is built with vanilla web technologies, making it easy to modify and extend:

- **Add new sections**: Edit `index.html` and corresponding CSS
- **Modify 3D scene**: Update shaders in `Main.js` or add new objects
- **Customize styling**: Modify `Styles/Main.css` for visual changes
- **Add interactions**: Extend event handlers in `Main.js`

## 🎨 Customization

### Adding New Projects

```html
<a href="your-project-url" target="_blank" class="Project">
  <p
    data-value="Project Name"
    style="color: white; font-weight: bold; white-space: pre"
  >
    Project Name
  </p>
  <p data-value="Project Description">Project Description</p>
  <div class="Separator"></div>
  <p data-value="2024">2024</p>
</a>
```

### Modifying 3D Effects

- **Lighting**: Adjust light position and color in fragment shader
- **Screen Effects**: Modify scanline and noise parameters
- **Camera**: Change rotation sensitivity and decay rates

### Audio Customization

- Replace audio files in `Sounds/` directory
- Adjust volume levels in `Main.js`
- Modify fade timing for transitions

## 🔧 Browser Support

| Browser     | WebGL2 | Audio | Performance |
| ----------- | ------ | ----- | ----------- |
| Chrome 90+  | ✅     | ✅    | Excellent   |
| Firefox 88+ | ✅     | ✅    | Excellent   |
| Safari 15+  | ✅     | ⚠️    | Good        |
| Edge 90+    | ✅     | ✅    | Excellent   |

## 📱 Mobile Considerations

The portfolio is optimized for desktop experiences but includes:

- **Touch event handling** for mobile devices
- **Responsive design** elements
- **Performance optimizations** for mobile hardware

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


### Connect

- **GitHub**: [@MarufHossain14](https://github.com/MarufHossain14)
- **Email**: hossain.maruf186@gmail.com
- **LinkedIn**: [Maruf Hossain](https://www.linkedin.com/in/maruf-hossainn/)

---

⭐ **Star this repository if you found it helpful!**

