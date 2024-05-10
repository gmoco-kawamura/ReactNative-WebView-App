
import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, NativeSyntheticEvent, Button, NativeEventEmitter, NativeModules } from 'react-native';
// import SmaAdWebView from 'smaad-reactnative-sdk'
import SmaAdWebView from 'smaad-rn-sdk';
// import SmaadReactnative2View from 'react-native-smaad-reactnative2';

// イベントの型定義
interface LoadFinishedEventData {
  url: string;
}

type LoadFinishedEvent = NativeSyntheticEvent<LoadFinishedEventData>;
type LoadStartedEvent = NativeSyntheticEvent<{ url: string }>;
type RedirectReceivedEvent = NativeSyntheticEvent<{ url: string }>;
type LoadErrorEvent = NativeSyntheticEvent<{ url: string, error: string }>;
type ClosePressedEvent = NativeSyntheticEvent<{ message: string}>;

const App = () => {
  const [webView, setWebView] = useState<JSX.Element | null>(null); // WebViewインスタンスを制御するステート

  const handleLoadFinished = useCallback((event: LoadFinishedEvent) => {
    console.log('Web page loaded!!!:', event.nativeEvent.url);
  }, []);

  const handleLoadStarted = useCallback((event: LoadStartedEvent) => {
    console.log('Loading started for:', event.nativeEvent.url);
  }, []);

  const handleRedirectReceived = useCallback((event: RedirectReceivedEvent) => {
    console.log('Redirect received to:', event.nativeEvent.url);
  }, []);

  const handleLoadError = useCallback((event: LoadErrorEvent) => {
    console.error('Load error for:', event.nativeEvent.url, 'with error:', event.nativeEvent.error);
  }, []);

  const handleClosePressed = useCallback((event: ClosePressedEvent) => {
    console.log('Close button pressed');
    setWebView(null);
  }, []);

  const handleShowWebView = useCallback(() => {
    const zoneId = '770558503';
    const userParameter = 'test';
    setWebView(
      <SmaAdWebView
        style={styles.webview}
        zoneId={zoneId}
        userParameter={userParameter}
        onLoadFinished={handleLoadFinished}
        onLoadStarted={handleLoadStarted}
        onRedirectReceived={handleRedirectReceived}
        onLoadError={handleLoadError}
        onClosePressed={handleClosePressed}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!webView && <Button title="Show WebView" onPress={handleShowWebView} />}
      {webView}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    width: '100%', // WebViewを画面いっぱいに表示
  },
});

export default App;
