import React, { Component, createContext } from 'react';

const themeConfig = {
  light: {
    mainBGColor:
      'linear-gradient(90deg, #00e842 0%, #57ff87 50%, #00e842 100%)',
    headerBGColor:
      'linear-gradient(90deg, #a4ff4d 0%, #00e842 50%, #a4ff4d 100%)',
    contentColor: '#1d2bcc',
    mainShadowBox: '0px 4px 10px -3px rgba(0, 0, 0, 0.75)',
    linkColor: '#1d2bcc',
    messageColor: 'black',
  },

  dark: {
    mainBGColor: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
    headerBGColor:
      'linear-gradient(90deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    contentColor: '#ccc',
    mainShadowBox: '0px 4px 10px -3px rgba(255, 255, 255, 0.75)',
    linkColor: '#00d0ff',
    messageColor: '#ccc',
  },
};

const Context = createContext(themeConfig.light);

class ThemeContext extends Component {
  static Consumer = Context.Consumer;

  toggleTheme = () => {
    const { theme, config } = this.state;
    this.setState({
      theme: theme === 'dark' ? 'light' : 'dark',
      config:
        config === themeConfig.light ? themeConfig.dark : themeConfig.light,
    });
    window.localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
  };

  state = {
    theme: 'light',
    toggleTheme: this.toggleTheme,
    config: themeConfig.light,
  };

  componentDidMount() {
    if (window.localStorage.getItem('theme')) {
      const currentTheme = window.localStorage.getItem('theme');
      this.setState({
        theme: currentTheme,
        config: themeConfig[currentTheme],
      });
    } else {
      window.localStorage.setItem('theme', 'light');
    }
  }

  render() {
    const { children } = this.props;
    return (
      <Context.Provider
        value={{
          ...this.state,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

export default ThemeContext;
