import {
  bindThemeParamsCssVars,
  bindViewportCssVars,
  init as initSDK,
  isThemeParamsCssVarsBound,
  isViewportCssVarsBound,
  miniApp,
  mountBackButton,
  mountSettingsButton,
  mountThemeParamsSync,
  restoreInitData,
  retrieveLaunchParams,
  setDebug,
  targetOrigin,
  viewport,
} from '@telegram-apps/sdk-vue'

import { mockMacOs } from '~/core/mockMacOs'

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(): Promise<void> {
  const launchParams = retrieveLaunchParams()

  const debug =
    (launchParams.tgWebAppStartParam || '').includes('platformer_debug') ||
    import.meta.env.DEV

  setDebug(debug)
  targetOrigin.set('https://tgl.mini-apps.store')

  const { tgWebAppPlatform: platform } = launchParams

  initSDK()
  miniApp.ready()

  if (debug && ['ios', 'android'].includes(platform)) {
    void import('eruda').then(({ default: lib }) => {
      lib.init()
      lib.position({ x: window.innerWidth - 50, y: 0 })
    })
  }

  if (platform === 'macos') {
    mockMacOs()
  }

  restoreInitData()

  mountBackButton.ifAvailable()
  mountSettingsButton.ifAvailable()

  mountThemeParamsSync.ifAvailable()

  if (miniApp.isSupported() && !miniApp.isMounted()) {
    miniApp.mountSync()
  }

  const [viewportMounted] = viewport.mount.ifAvailable()
  if (viewportMounted) {
    if (isViewportCssVarsBound()) {
      bindViewportCssVars()
    }
  }

  if (!isThemeParamsCssVarsBound()) {
    bindThemeParamsCssVars()
  }

  console.log('[init] Initialization complete')
}
