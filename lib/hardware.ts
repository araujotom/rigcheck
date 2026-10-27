import type { Cpu, Gpu } from "@/lib/types";

/**
 * Hardware index.
 *
 * Scores are relative, normalised 0-100, and derived from aggregate gaming
 * benchmarks. They are intentionally coarse: this tool answers "will it run and
 * roughly how well", not "which part is 4% faster in a specific title".
 */

export const CPUS: Cpu[] = [
  // AMD AM5
  { id: "ryzen-9-9950x3d", name: "Ryzen 9 9950X3D", brand: "AMD", score: 100, cores: 16, threads: 32, year: 2025 },
  { id: "ryzen-7-9800x3d", name: "Ryzen 7 9800X3D", brand: "AMD", score: 100, cores: 8, threads: 16, year: 2024 },
  { id: "ryzen-9-7950x3d", name: "Ryzen 9 7950X3D", brand: "AMD", score: 94, cores: 16, threads: 32, year: 2023 },
  { id: "ryzen-7-7800x3d", name: "Ryzen 7 7800X3D", brand: "AMD", score: 93, cores: 8, threads: 16, year: 2023 },
  { id: "ryzen-9-9950x", name: "Ryzen 9 9950X", brand: "AMD", score: 92, cores: 16, threads: 32, year: 2024 },
  { id: "ryzen-9-9900x", name: "Ryzen 9 9900X", brand: "AMD", score: 89, cores: 12, threads: 24, year: 2024 },
  { id: "ryzen-7-9700x", name: "Ryzen 7 9700X", brand: "AMD", score: 86, cores: 8, threads: 16, year: 2024 },
  { id: "ryzen-5-9600x", name: "Ryzen 5 9600X", brand: "AMD", score: 83, cores: 6, threads: 12, year: 2024 },
  { id: "ryzen-9-7950x", name: "Ryzen 9 7950X", brand: "AMD", score: 90, cores: 16, threads: 32, year: 2022 },
  { id: "ryzen-9-7900x", name: "Ryzen 9 7900X", brand: "AMD", score: 87, cores: 12, threads: 24, year: 2022 },
  { id: "ryzen-7-7700x", name: "Ryzen 7 7700X", brand: "AMD", score: 84, cores: 8, threads: 16, year: 2022 },
  { id: "ryzen-5-7600x", name: "Ryzen 5 7600X", brand: "AMD", score: 79, cores: 6, threads: 12, year: 2022 },
  { id: "ryzen-5-7600", name: "Ryzen 5 7600", brand: "AMD", score: 78, cores: 6, threads: 12, year: 2023 },
  { id: "ryzen-5-7500f", name: "Ryzen 5 7500F", brand: "AMD", score: 75, cores: 6, threads: 12, year: 2023 },
  { id: "ryzen-7-8700g", name: "Ryzen 7 8700G", brand: "AMD", score: 62, cores: 8, threads: 16, year: 2024, igpu: "radeon-780m" },
  { id: "ryzen-5-8600g", name: "Ryzen 5 8600G", brand: "AMD", score: 58, cores: 6, threads: 12, year: 2024, igpu: "radeon-760m" },
  { id: "ryzen-5-8500g", name: "Ryzen 5 8500G", brand: "AMD", score: 52, cores: 6, threads: 12, year: 2024, igpu: "radeon-740m" },

  // AMD AM4
  { id: "ryzen-7-5800x3d", name: "Ryzen 7 5800X3D", brand: "AMD", score: 78, cores: 8, threads: 16, year: 2022 },
  { id: "ryzen-7-5700x3d", name: "Ryzen 7 5700X3D", brand: "AMD", score: 75, cores: 8, threads: 16, year: 2024 },
  { id: "ryzen-9-5950x", name: "Ryzen 9 5950X", brand: "AMD", score: 76, cores: 16, threads: 32, year: 2020 },
  { id: "ryzen-9-5900x", name: "Ryzen 9 5900X", brand: "AMD", score: 73, cores: 12, threads: 24, year: 2020 },
  { id: "ryzen-7-5800x", name: "Ryzen 7 5800X", brand: "AMD", score: 69, cores: 8, threads: 16, year: 2020 },
  { id: "ryzen-7-5700x", name: "Ryzen 7 5700X", brand: "AMD", score: 66, cores: 8, threads: 16, year: 2022 },
  { id: "ryzen-5-5600x", name: "Ryzen 5 5600X", brand: "AMD", score: 61, cores: 6, threads: 12, year: 2020 },
  { id: "ryzen-5-5600", name: "Ryzen 5 5600", brand: "AMD", score: 58, cores: 6, threads: 12, year: 2022 },
  { id: "ryzen-5-5600g", name: "Ryzen 5 5600G", brand: "AMD", score: 54, cores: 6, threads: 12, year: 2021, igpu: "vega-7" },
  { id: "ryzen-5-5600gt", name: "Ryzen 5 5600GT", brand: "AMD", score: 55, cores: 6, threads: 12, year: 2024, igpu: "vega-7" },
  { id: "ryzen-5-5500gt", name: "Ryzen 5 5500GT", brand: "AMD", score: 53, cores: 6, threads: 12, year: 2024, igpu: "vega-7" },
  { id: "ryzen-7-5700g", name: "Ryzen 7 5700G", brand: "AMD", score: 61, cores: 8, threads: 16, year: 2021, igpu: "vega-8" },
  { id: "ryzen-3-4600g", name: "Ryzen 3 4600G", brand: "AMD", score: 40, cores: 6, threads: 12, year: 2022, igpu: "vega-6" },
  { id: "ryzen-5-5500", name: "Ryzen 5 5500", brand: "AMD", score: 47, cores: 6, threads: 12, year: 2022 },
  { id: "ryzen-5-4500", name: "Ryzen 5 4500", brand: "AMD", score: 40, cores: 6, threads: 12, year: 2022 },
  { id: "ryzen-5-3600", name: "Ryzen 5 3600", brand: "AMD", score: 44, cores: 6, threads: 12, year: 2019 },
  { id: "ryzen-5-3500x", name: "Ryzen 5 3500X", brand: "AMD", score: 38, cores: 6, threads: 6, year: 2019 },
  { id: "ryzen-7-2700x", name: "Ryzen 7 2700X", brand: "AMD", score: 36, cores: 8, threads: 16, year: 2018 },
  { id: "ryzen-5-2600", name: "Ryzen 5 2600", brand: "AMD", score: 32, cores: 6, threads: 12, year: 2018 },
  { id: "ryzen-7-1700", name: "Ryzen 7 1700", brand: "AMD", score: 28, cores: 8, threads: 16, year: 2017 },
  { id: "ryzen-5-1600", name: "Ryzen 5 1600", brand: "AMD", score: 26, cores: 6, threads: 12, year: 2017 },
  { id: "ryzen-3-3200g", name: "Ryzen 3 3200G", brand: "AMD", score: 26, cores: 4, threads: 4, year: 2019, igpu: "vega-8-3200g" },

  // Intel Core Ultra / 14th / 13th
  { id: "core-ultra-9-285k", name: "Core Ultra 9 285K", brand: "Intel", score: 89, cores: 24, threads: 24, year: 2024 },
  { id: "core-ultra-7-265k", name: "Core Ultra 7 265K", brand: "Intel", score: 86, cores: 20, threads: 20, year: 2024 },
  { id: "core-ultra-5-245k", name: "Core Ultra 5 245K", brand: "Intel", score: 78, cores: 14, threads: 14, year: 2024 },
  { id: "core-ultra-5-225f", name: "Core Ultra 5 225F", brand: "Intel", score: 68, cores: 10, threads: 10, year: 2025 },
  { id: "i9-14900k", name: "Core i9-14900K", brand: "Intel", score: 92, cores: 24, threads: 32, year: 2023, igpu: "uhd-770" },
  { id: "i7-14700k", name: "Core i7-14700K", brand: "Intel", score: 88, cores: 20, threads: 28, year: 2023, igpu: "uhd-770" },
  { id: "i5-14600k", name: "Core i5-14600K", brand: "Intel", score: 83, cores: 14, threads: 20, year: 2023, igpu: "uhd-770" },
  { id: "i5-14400f", name: "Core i5-14400F", brand: "Intel", score: 70, cores: 10, threads: 16, year: 2024 },
  { id: "i3-14100", name: "Core i3-14100", brand: "Intel", score: 48, cores: 4, threads: 8, year: 2024, igpu: "uhd-730" },
  { id: "i9-13900k", name: "Core i9-13900K", brand: "Intel", score: 90, cores: 24, threads: 32, year: 2022, igpu: "uhd-770" },
  { id: "i7-13700k", name: "Core i7-13700K", brand: "Intel", score: 85, cores: 16, threads: 24, year: 2022, igpu: "uhd-770" },
  { id: "i5-13600k", name: "Core i5-13600K", brand: "Intel", score: 81, cores: 14, threads: 20, year: 2022, igpu: "uhd-770" },
  { id: "i5-13400f", name: "Core i5-13400F", brand: "Intel", score: 71, cores: 10, threads: 16, year: 2023 },
  { id: "i5-13100f", name: "Core i5-13100F", brand: "Intel", score: 50, cores: 4, threads: 8, year: 2023 },

  // Intel 12th / 11th / 10th
  { id: "i9-12900k", name: "Core i9-12900K", brand: "Intel", score: 81, cores: 16, threads: 24, year: 2021, igpu: "uhd-770" },
  { id: "i7-12700k", name: "Core i7-12700K", brand: "Intel", score: 77, cores: 12, threads: 20, year: 2021, igpu: "uhd-770" },
  { id: "i7-12700", name: "Core i7-12700", brand: "Intel", score: 75, cores: 12, threads: 20, year: 2022, igpu: "uhd-770" },
  { id: "i5-12600k", name: "Core i5-12600K", brand: "Intel", score: 69, cores: 10, threads: 16, year: 2021, igpu: "uhd-770" },
  { id: "i5-12400f", name: "Core i5-12400F", brand: "Intel", score: 65, cores: 6, threads: 12, year: 2022 },
  { id: "i5-12400", name: "Core i5-12400", brand: "Intel", score: 65, cores: 6, threads: 12, year: 2022, igpu: "uhd-730" },
  { id: "i3-12100f", name: "Core i3-12100F", brand: "Intel", score: 50, cores: 4, threads: 8, year: 2022 },
  { id: "i9-11900k", name: "Core i9-11900K", brand: "Intel", score: 61, cores: 8, threads: 16, year: 2021 },
  { id: "i7-11700k", name: "Core i7-11700K", brand: "Intel", score: 59, cores: 8, threads: 16, year: 2021 },
  { id: "i5-11600k", name: "Core i5-11600K", brand: "Intel", score: 55, cores: 6, threads: 12, year: 2021 },
  { id: "i5-11400f", name: "Core i5-11400F", brand: "Intel", score: 51, cores: 6, threads: 12, year: 2021 },
  { id: "i9-10900k", name: "Core i9-10900K", brand: "Intel", score: 56, cores: 10, threads: 20, year: 2020, igpu: "uhd-630" },
  { id: "i7-10700k", name: "Core i7-10700K", brand: "Intel", score: 51, cores: 8, threads: 16, year: 2020, igpu: "uhd-630" },
  { id: "i5-10400f", name: "Core i5-10400F", brand: "Intel", score: 43, cores: 6, threads: 12, year: 2020 },
  { id: "i3-10100f", name: "Core i3-10100F", brand: "Intel", score: 36, cores: 4, threads: 8, year: 2020 },

  // Intel 9th / 8th / 7th / 6th
  { id: "i9-9900k", name: "Core i9-9900K", brand: "Intel", score: 55, cores: 8, threads: 16, year: 2018 },
  { id: "i7-9700k", name: "Core i7-9700K", brand: "Intel", score: 52, cores: 8, threads: 8, year: 2018 },
  { id: "i5-9600k", name: "Core i5-9600K", brand: "Intel", score: 40, cores: 6, threads: 6, year: 2018 },
  { id: "i3-9100f", name: "Core i3-9100F", brand: "Intel", score: 30, cores: 4, threads: 4, year: 2019 },
  { id: "i7-8700k", name: "Core i7-8700K", brand: "Intel", score: 46, cores: 6, threads: 12, year: 2017 },
  { id: "i5-8600k", name: "Core i5-8600K", brand: "Intel", score: 34, cores: 6, threads: 6, year: 2017 },
  { id: "i5-8400", name: "Core i5-8400", brand: "Intel", score: 34, cores: 6, threads: 6, year: 2017 },
  { id: "i3-8100", name: "Core i3-8100", brand: "Intel", score: 28, cores: 4, threads: 4, year: 2017 },
  { id: "i7-7700k", name: "Core i7-7700K", brand: "Intel", score: 37, cores: 4, threads: 8, year: 2017 },
  { id: "i5-7600k", name: "Core i5-7600K", brand: "Intel", score: 27, cores: 4, threads: 4, year: 2017 },
  { id: "i5-7500", name: "Core i5-7500", brand: "Intel", score: 26, cores: 4, threads: 4, year: 2017 },
  { id: "i7-6700k", name: "Core i7-6700K", brand: "Intel", score: 33, cores: 4, threads: 8, year: 2015 },
  { id: "i7-6700", name: "Core i7-6700", brand: "Intel", score: 32, cores: 4, threads: 8, year: 2015 },
  { id: "i5-6600k", name: "Core i5-6600K", brand: "Intel", score: 24, cores: 4, threads: 4, year: 2015 },
  { id: "i5-6400", name: "Core i5-6400", brand: "Intel", score: 20, cores: 4, threads: 4, year: 2015 },

  // Intel 4th gen and older
  { id: "i7-4790k", name: "Core i7-4790K", brand: "Intel", score: 21, cores: 4, threads: 8, year: 2014 },
  { id: "i5-4690k", name: "Core i5-4690K", brand: "Intel", score: 16, cores: 4, threads: 4, year: 2014 },
  { id: "i5-4460", name: "Core i5-4460", brand: "Intel", score: 15, cores: 4, threads: 4, year: 2014 },
  { id: "i7-3770", name: "Core i7-3770", brand: "Intel", score: 14, cores: 4, threads: 8, year: 2012 },
  { id: "i5-3570k", name: "Core i5-3570K", brand: "Intel", score: 12, cores: 4, threads: 4, year: 2012 },
  { id: "i5-2500k", name: "Core i5-2500K", brand: "Intel", score: 10, cores: 4, threads: 4, year: 2011 },
  { id: "i3-2100", name: "Core i3-2100", brand: "Intel", score: 4, cores: 2, threads: 4, year: 2011 },
];

export const GPUS: Gpu[] = [
  // NVIDIA RTX 50 / 40
  { id: "rtx-5090", name: "GeForce RTX 5090", brand: "NVIDIA", score: 100, vram: 32, year: 2025, kind: "discrete" },
  { id: "rtx-5080", name: "GeForce RTX 5080", brand: "NVIDIA", score: 72, vram: 16, year: 2025, kind: "discrete" },
  { id: "rtx-5070-ti", name: "GeForce RTX 5070 Ti", brand: "NVIDIA", score: 60, vram: 16, year: 2025, kind: "discrete" },
  { id: "rtx-5070", name: "GeForce RTX 5070", brand: "NVIDIA", score: 51, vram: 12, year: 2025, kind: "discrete" },
  { id: "rtx-5060-ti", name: "GeForce RTX 5060 Ti", brand: "NVIDIA", score: 37, vram: 16, year: 2025, kind: "discrete" },
  { id: "rtx-5060", name: "GeForce RTX 5060", brand: "NVIDIA", score: 30, vram: 8, year: 2025, kind: "discrete" },
  { id: "rtx-4090", name: "GeForce RTX 4090", brand: "NVIDIA", score: 82, vram: 24, year: 2022, kind: "discrete" },
  { id: "rtx-4080-super", name: "GeForce RTX 4080 Super", brand: "NVIDIA", score: 68, vram: 16, year: 2024, kind: "discrete" },
  { id: "rtx-4080", name: "GeForce RTX 4080", brand: "NVIDIA", score: 65, vram: 16, year: 2022, kind: "discrete" },
  { id: "rtx-4070-ti-super", name: "GeForce RTX 4070 Ti Super", brand: "NVIDIA", score: 59, vram: 16, year: 2024, kind: "discrete" },
  { id: "rtx-4070-ti", name: "GeForce RTX 4070 Ti", brand: "NVIDIA", score: 56, vram: 12, year: 2023, kind: "discrete" },
  { id: "rtx-4070-super", name: "GeForce RTX 4070 Super", brand: "NVIDIA", score: 52, vram: 12, year: 2024, kind: "discrete" },
  { id: "rtx-4070", name: "GeForce RTX 4070", brand: "NVIDIA", score: 47, vram: 12, year: 2023, kind: "discrete" },
  { id: "rtx-4060-ti", name: "GeForce RTX 4060 Ti", brand: "NVIDIA", score: 37, vram: 8, year: 2023, kind: "discrete" },
  { id: "rtx-4060", name: "GeForce RTX 4060", brand: "NVIDIA", score: 31, vram: 8, year: 2023, kind: "discrete" },

  // NVIDIA RTX 30 / 20
  { id: "rtx-3080-ti", name: "GeForce RTX 3080 Ti", brand: "NVIDIA", score: 51, vram: 12, year: 2021, kind: "discrete" },
  { id: "rtx-3080", name: "GeForce RTX 3080", brand: "NVIDIA", score: 47, vram: 10, year: 2020, kind: "discrete" },
  { id: "rtx-3070-ti", name: "GeForce RTX 3070 Ti", brand: "NVIDIA", score: 41, vram: 8, year: 2021, kind: "discrete" },
  { id: "rtx-3070", name: "GeForce RTX 3070", brand: "NVIDIA", score: 39, vram: 8, year: 2020, kind: "discrete" },
  { id: "rtx-3060-ti", name: "GeForce RTX 3060 Ti", brand: "NVIDIA", score: 33, vram: 8, year: 2020, kind: "discrete" },
  { id: "rtx-3060", name: "GeForce RTX 3060 12GB", brand: "NVIDIA", score: 27, vram: 12, year: 2021, kind: "discrete" },
  { id: "rtx-2080-ti", name: "GeForce RTX 2080 Ti", brand: "NVIDIA", score: 42, vram: 11, year: 2018, kind: "discrete" },
  { id: "rtx-2080-super", name: "GeForce RTX 2080 Super", brand: "NVIDIA", score: 38, vram: 8, year: 2019, kind: "discrete" },
  { id: "rtx-2080", name: "GeForce RTX 2080", brand: "NVIDIA", score: 36, vram: 8, year: 2018, kind: "discrete" },
  { id: "rtx-2070-super", name: "GeForce RTX 2070 Super", brand: "NVIDIA", score: 35, vram: 8, year: 2019, kind: "discrete" },
  { id: "rtx-2070", name: "GeForce RTX 2070", brand: "NVIDIA", score: 31, vram: 8, year: 2018, kind: "discrete" },
  { id: "rtx-2060-super", name: "GeForce RTX 2060 Super", brand: "NVIDIA", score: 29, vram: 8, year: 2019, kind: "discrete" },
  { id: "rtx-2060", name: "GeForce RTX 2060", brand: "NVIDIA", score: 25, vram: 6, year: 2019, kind: "discrete" },

  // NVIDIA GTX 16 / 10
  { id: "gtx-1660-ti", name: "GeForce GTX 1660 Ti", brand: "NVIDIA", score: 23, vram: 6, year: 2019, kind: "discrete" },
  { id: "gtx-1660-super", name: "GeForce GTX 1660 Super", brand: "NVIDIA", score: 22, vram: 6, year: 2019, kind: "discrete" },
  { id: "gtx-1660", name: "GeForce GTX 1660", brand: "NVIDIA", score: 20, vram: 6, year: 2019, kind: "discrete" },
  { id: "gtx-1650-super", name: "GeForce GTX 1650 Super", brand: "NVIDIA", score: 18, vram: 4, year: 2019, kind: "discrete" },
  { id: "gtx-1650", name: "GeForce GTX 1650", brand: "NVIDIA", score: 14, vram: 4, year: 2019, kind: "discrete" },
  { id: "gtx-1080-ti", name: "GeForce GTX 1080 Ti", brand: "NVIDIA", score: 32, vram: 11, year: 2017, kind: "discrete" },
  { id: "gtx-1080", name: "GeForce GTX 1080", brand: "NVIDIA", score: 25, vram: 8, year: 2016, kind: "discrete" },
  { id: "gtx-1070-ti", name: "GeForce GTX 1070 Ti", brand: "NVIDIA", score: 24, vram: 8, year: 2017, kind: "discrete" },
  { id: "gtx-1070", name: "GeForce GTX 1070", brand: "NVIDIA", score: 22, vram: 8, year: 2016, kind: "discrete" },
  { id: "gtx-1060-6gb", name: "GeForce GTX 1060 6GB", brand: "NVIDIA", score: 17, vram: 6, year: 2016, kind: "discrete" },
  { id: "gtx-1060-3gb", name: "GeForce GTX 1060 3GB", brand: "NVIDIA", score: 15, vram: 3, year: 2016, kind: "discrete" },
  { id: "gtx-1050-ti", name: "GeForce GTX 1050 Ti", brand: "NVIDIA", score: 11, vram: 4, year: 2016, kind: "discrete" },
  { id: "gtx-1050", name: "GeForce GTX 1050", brand: "NVIDIA", score: 9, vram: 2, year: 2016, kind: "discrete" },
  { id: "gtx-980-ti", name: "GeForce GTX 980 Ti", brand: "NVIDIA", score: 20, vram: 6, year: 2015, kind: "discrete" },
  { id: "gtx-970", name: "GeForce GTX 970", brand: "NVIDIA", score: 14, vram: 4, year: 2014, kind: "discrete" },
  { id: "gtx-960", name: "GeForce GTX 960", brand: "NVIDIA", score: 9, vram: 2, year: 2015, kind: "discrete" },
  { id: "gtx-750-ti", name: "GeForce GTX 750 Ti", brand: "NVIDIA", score: 6, vram: 2, year: 2014, kind: "discrete" },

  // AMD RDNA 4 / 3
  { id: "rx-9070-xt", name: "Radeon RX 9070 XT", brand: "AMD", score: 58, vram: 16, year: 2025, kind: "discrete" },
  { id: "rx-9070", name: "Radeon RX 9070", brand: "AMD", score: 53, vram: 16, year: 2025, kind: "discrete" },
  { id: "rx-7900-xtx", name: "Radeon RX 7900 XTX", brand: "AMD", score: 67, vram: 24, year: 2022, kind: "discrete" },
  { id: "rx-7900-xt", name: "Radeon RX 7900 XT", brand: "AMD", score: 58, vram: 20, year: 2022, kind: "discrete" },
  { id: "rx-7800-xt", name: "Radeon RX 7800 XT", brand: "AMD", score: 46, vram: 16, year: 2023, kind: "discrete" },
  { id: "rx-7700-xt", name: "Radeon RX 7700 XT", brand: "AMD", score: 40, vram: 12, year: 2023, kind: "discrete" },
  { id: "rx-7600-xt", name: "Radeon RX 7600 XT", brand: "AMD", score: 31, vram: 16, year: 2024, kind: "discrete" },
  { id: "rx-7600", name: "Radeon RX 7600", brand: "AMD", score: 29, vram: 8, year: 2023, kind: "discrete" },
  { id: "rx-6950-xt", name: "Radeon RX 6950 XT", brand: "AMD", score: 48, vram: 16, year: 2022, kind: "discrete" },
  { id: "rx-6900-xt", name: "Radeon RX 6900 XT", brand: "AMD", score: 47, vram: 16, year: 2020, kind: "discrete" },
  { id: "rx-6800-xt", name: "Radeon RX 6800 XT", brand: "AMD", score: 44, vram: 16, year: 2020, kind: "discrete" },
  { id: "rx-6800", name: "Radeon RX 6800", brand: "AMD", score: 40, vram: 16, year: 2020, kind: "discrete" },
  { id: "rx-6750-xt", name: "Radeon RX 6750 XT", brand: "AMD", score: 35, vram: 12, year: 2022, kind: "discrete" },
  { id: "rx-6700-xt", name: "Radeon RX 6700 XT", brand: "AMD", score: 34, vram: 12, year: 2021, kind: "discrete" },
  { id: "rx-6650-xt", name: "Radeon RX 6650 XT", brand: "AMD", score: 29, vram: 8, year: 2022, kind: "discrete" },
  { id: "rx-6600-xt", name: "Radeon RX 6600 XT", brand: "AMD", score: 27, vram: 8, year: 2021, kind: "discrete" },
  { id: "rx-6600", name: "Radeon RX 6600", brand: "AMD", score: 25, vram: 8, year: 2021, kind: "discrete" },
  { id: "rx-5700-xt", name: "Radeon RX 5700 XT", brand: "AMD", score: 25, vram: 8, year: 2019, kind: "discrete" },
  { id: "rx-5700", name: "Radeon RX 5700", brand: "AMD", score: 22, vram: 8, year: 2019, kind: "discrete" },
  { id: "rx-5600-xt", name: "Radeon RX 5600 XT", brand: "AMD", score: 20, vram: 6, year: 2020, kind: "discrete" },
  { id: "rx-580", name: "Radeon RX 580 8GB", brand: "AMD", score: 12, vram: 8, year: 2017, kind: "discrete" },
  { id: "rx-570", name: "Radeon RX 570 4GB", brand: "AMD", score: 10, vram: 4, year: 2017, kind: "discrete" },
  { id: "rx-5500-xt", name: "Radeon RX 5500 XT", brand: "AMD", score: 13, vram: 8, year: 2019, kind: "discrete" },
  { id: "vega-64", name: "Radeon RX Vega 64", brand: "AMD", score: 14, vram: 8, year: 2017, kind: "discrete" },

  // AMD integrated. Shares from the Steam Hardware Survey (September 2026):
  // "AMD Radeon Graphics" 1.51% (RDNA2/3 family), "AMD Radeon(TM) Graphics"
  // 0.82% (Vega family), "Radeon 780M" 0.27%, "Vega 8" 0.26%, "Vega 3" 0.16%.
  { id: "radeon-780m", name: "Radeon 780M (integrated)", brand: "AMD", score: 9, vram: 4, year: 2023, kind: "integrated" },
  { id: "radeon-680m", name: "Radeon 680M (integrated)", brand: "AMD", score: 7, vram: 4, year: 2022, kind: "integrated" },
  { id: "radeon-760m", name: "Radeon 760M (integrated)", brand: "AMD", score: 6, vram: 4, year: 2023, kind: "integrated" },
  { id: "radeon-660m", name: "Radeon 660M (integrated)", brand: "AMD", score: 5, vram: 4, year: 2022, kind: "integrated" },
  { id: "radeon-740m", name: "Radeon 740M (integrated)", brand: "AMD", score: 4, vram: 4, year: 2023, kind: "integrated" },
  { id: "vega-8", name: "Radeon Vega 8 (5700G)", brand: "AMD", score: 5, vram: 2, year: 2021, kind: "integrated" },
  { id: "vega-7", name: "Radeon Vega 7 (5600G)", brand: "AMD", score: 4, vram: 2, year: 2021, kind: "integrated" },
  { id: "vega-8-3200g", name: "Radeon Vega 8 (3200G)", brand: "AMD", score: 3, vram: 2, year: 2019, kind: "integrated" },
  { id: "vega-6", name: "Radeon Vega 6 (4600G)", brand: "AMD", score: 3, vram: 2, year: 2022, kind: "integrated" },
  { id: "vega-3", name: "Radeon Vega 3", brand: "AMD", score: 1, vram: 2, year: 2019, kind: "integrated" },

  // Intel integrated. Survey: "Iris Xe" 1.52%, "Intel(R)/Intel UHD Graphics"
  // 1.06% + 0.61%, "Arc Graphics" 0.25%, "UHD 630" 0.23%, "HD 520" 0.17%,
  // "HD 620" 0.16%.
  { id: "intel-arc-graphics", name: "Intel Arc Graphics (integrated)", brand: "Intel", score: 7, vram: 4, year: 2024, kind: "integrated" },
  { id: "iris-xe", name: "Intel Iris Xe (integrated)", brand: "Intel", score: 4, vram: 2, year: 2020, kind: "integrated" },
  { id: "uhd-770", name: "Intel UHD 770 (integrated)", brand: "Intel", score: 3, vram: 2, year: 2022, kind: "integrated" },
  { id: "uhd-730", name: "Intel UHD 730 (integrated)", brand: "Intel", score: 2, vram: 2, year: 2022, kind: "integrated" },
  { id: "uhd-630", name: "Intel UHD 630 (integrated)", brand: "Intel", score: 2, vram: 2, year: 2017, kind: "integrated" },
  { id: "hd-620", name: "Intel HD 620 (integrated)", brand: "Intel", score: 1, vram: 2, year: 2017, kind: "integrated" },
  { id: "hd-520", name: "Intel HD 520 (integrated)", brand: "Intel", score: 1, vram: 2, year: 2015, kind: "integrated" },

  // Discrete Intel cards
  { id: "arc-b580", name: "Intel Arc B580", brand: "Intel", score: 33, vram: 12, year: 2024, kind: "discrete" },
  { id: "arc-a770", name: "Intel Arc A770", brand: "Intel", score: 31, vram: 16, year: 2022, kind: "discrete" },
  { id: "arc-a750", name: "Intel Arc A750", brand: "Intel", score: 29, vram: 8, year: 2022, kind: "discrete" },
  { id: "arc-a580", name: "Intel Arc A580", brand: "Intel", score: 25, vram: 8, year: 2023, kind: "discrete" },
  { id: "arc-a380", name: "Intel Arc A380", brand: "Intel", score: 12, vram: 6, year: 2022, kind: "discrete" },
];

export const CPU_BY_ID = new Map(CPUS.map((c) => [c.id, c]));
export const GPU_BY_ID = new Map(GPUS.map((g) => [g.id, g]));

export const DEFAULT_SPECS = {
  cpuId: "ryzen-5-5600",
  gpuId: "rtx-3060",
  ram: 16,
  vram: 12,
  storage: 250,
  maxResolution: 1440 as const,
  targetFps: 60,
};
