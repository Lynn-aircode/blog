<template>
  <div class="polishing-card-box">
    <div class="polishing-card">
      <slot />
      <div class="polishing-light"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.polishing-card-box {
  width: fit-content;
  height: fit-content;
  position: relative;
  perspective: 1000px;
  display: inline-block;
  letter-spacing: -4px;
}
.polishing-card {
  background-color: black;
  overflow: hidden;
  background-size: cover;
  transition: transform 400ms ease 0s, opacity 400ms ease 0s, top 400ms ease 0s,
    right 400ms ease 0s, filter 400ms ease 0s;
  transform-origin: top;
  cursor: pointer;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
}
.polishing-card .polishing-light {
  background-image: linear-gradient(
    0deg,
    rgb(255, 255, 255),
    rgba(255, 255, 255, 0.1) 24%
  );
  width: 800px;
  height: 800px;
  position: absolute;
  right: -640px;
  top: -640px;
  opacity: 0.12;
  transform: rotate(27deg);
  filter: blur(12px);
  transition: inherit;
}

.polishing-card:hover {
  border-width: 1px;
  transform: scale(1.02) rotateX(5deg);
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.1));
}
.polishing-card:hover .polishing-light {
  right: -400px;
  top: -640px;
  opacity: 0.2;
}
.polishing-card img {
  display: block;
}
</style>
