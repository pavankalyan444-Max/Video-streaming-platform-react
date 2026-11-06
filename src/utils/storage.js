import { sampleVideos } from "../data/sampleVideos.js";

export function readStorage(key, fallback) {
  const savedValue = localStorage.getItem(key);
  return savedValue === null ? fallback : JSON.parse(savedValue);
}

export function getStartingVideos() {
  const savedVideos = localStorage.getItem("streamVideos");
  if (savedVideos !== null) return JSON.parse(savedVideos);

  localStorage.setItem("streamVideos", JSON.stringify(sampleVideos));
  return sampleVideos;
}
