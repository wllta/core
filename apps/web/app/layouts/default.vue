<template>
  <div class="min-h-screen flex flex-col lg:flex-row relative">
    <div class="hidden lg:block">
      <AppSidebar />
    </div>

    <div class="flex-1 flex flex-col">
      <div class="flex justify-end items-center px-3 py-2 bg-[var(--ui-bg)]">
        <div class="relative">
          <AppMainDropdown />
        </div>
      </div>

      <main class="flex-1 py-2 px-5">
        <slot />
      </main>

      <footer class="block lg:hidden fixed bottom-0 w-full bg-white shadow-md dark:bg-zinc-900 z-50">
        <AppTabBar />
      </footer>
    </div>
  </div>
</template>
