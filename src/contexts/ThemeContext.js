import React, { Component, createContext } from 'react';

const themeConfig = {
  light: {
    mainBGColor: 'snow',
    contentColor: '#1d2bcc',
    mainShadowBox: '0px 4px 10px -3px rgba(0, 0, 0, 0.75)',
    linkColor: '#1d2bcc',
    inputColor: 'snow',
    messageColor: 'black',
  },

  dark: {
    mainBGColor: '#333333',
    contentColor: '#ccc',
    mainShadowBox: '0px 4px 10px -3px rgba(255, 255, 255, 0.75)',
    linkColor: '#00d0ff',
    inputColor: '#e0e0e0',
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
