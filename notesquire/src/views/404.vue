<template>
  <section
    class="relative py-24 md:py-44 lg:pt-56 lg:pb-72 bg-white"
    style="
      background-image: url('/assets/flex-ui-assets/elements/pattern-white.svg');
      background-position: center;
    "
  >
    <section class="relative z-10 container px-4 mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full md:w-2/3">
          <div class="md:max-w-xl mx-auto text-center md:text-left">
            <span class="text-6xl md:text-7xl text-green-500 leading-tight font-bold"
              >404</span
            >
            <h2
              class="mb-4 text-4xl md:text-5xl leading-tight font-bold tracking-tighter"
            >
              Note not found
            </h2>
            <p class="mb-6 text-lg md:text-xl text-coolGray-500">
              Something went wrong, so this page is broken.
            </p>
            <div class="flex flex-wrap">
              <div class="w-full md:w-auto py-1 md:py-0 md:mr-6">
                <a
                  class="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-green-500 rounded-md shadow-sm"
                  @click="this.$router.push('/')"
                  >Create This Note</a
                >
              </div>
              <div class="w-full md:w-auto py-1 md:py-0">
                <a
                  class="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-coolGray-800 font-medium text-center bg-white hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm"
                  @click="window.reload()"
                  >Try Again</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// @ is an alias to /src
export default {
  name: "404",
  components: {},
};
</script>
