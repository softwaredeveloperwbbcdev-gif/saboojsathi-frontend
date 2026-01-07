const encryptKey = (key) => btoa(key); // "1" becomes "MQ==", etc.

export const phaseYearId = {
  [encryptKey("1")]: {
    year: "2015",
    phase: 1,
    phaseName: "I",
    lock: "lock_xi",
    distribution: "",
  },
  [encryptKey("2")]: {
    year: "2015",
    phase: 2,
    phaseName: "II",
    lock: "lock_ix",
    distribution: "_phaseii",
  },
  [encryptKey("3")]: {
    year: "2016",
    phase: 3,
    phaseName: "III",
    lock: "lock_ix_2016",
    distribution: "_phaseiii",
  },
  [encryptKey("4")]: {
    year: "2017",
    phase: 3,
    phaseName: "III",
    lock: "lock_ix_2017",
    distribution: "_phaseiii",
  },
  [encryptKey("5")]: {
    year: "2018",
    phase: 4,
    phaseName: "IV",
    lock: "lock_ix_2018",
    distribution: "_phaseiv",
  },
  [encryptKey("6")]: {
    year: "2019",
    phase: 5,
    phaseName: "V",
    lock: "lock_ix_2019",
    distribution: "_phasev",
  },
  [encryptKey("7")]: {
    year: "2020",
    phase: 6,
    phaseName: "VI",
    lock: "lock_ix_2020",
    distribution: "_phasevi",
  },
  [encryptKey("8")]: {
    year: "2021",
    phase: 7,
    phaseName: "VII",
    lock: "lock_ix_2021",
    distribution: "_phasevii",
  },
  [encryptKey("9")]: {
    year: "2022",
    phase: 8,
    phaseName: "VIII",
    lock: "lock_ix_2022",
    distribution: "_phaseviii",
  },
  [encryptKey("10")]: {
    year: "2023",
    phase: 9,
    phaseName: "IX",
    lock: "lock_ix_2023",
    distribution: "_phaseix",
  },
  [encryptKey("11")]: {
    year: "2024",
    phase: 10,
    phaseName: "X",
    lock: "lock_ix_2024",
    distribution: "_phasex",
  },
  [encryptKey("12")]: {
    year: "2025",
    phase: 11,
    phaseName: "XI",
    lock: "lock_ix_2025",
    distribution: "_phasexi",
  },
  [encryptKey("13")]: {
    year: "2026",
    phase: 12,
    phaseName: "XII",
    lock: "lock_ix_2026",
    distribution: "_phasexii",
  },
  [encryptKey("14")]: {
    year: "2027",
    phase: 13,
    phaseName: "XIII",
    lock: "lock_ix_2027",
    distribution: "_phasexiii",
  },
};

// Optional: default if not found
export const defaultPhaseYear = phaseYearId[encryptKey("12")];
