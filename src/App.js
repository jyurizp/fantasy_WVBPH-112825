import React, { useState, useMemo } from "react";
import {
  Search,
  UserPlus,
  X,
  Share2,
  Users,
  Shield,
  Zap,
  Target,
  Activity,
  ClipboardList,
  Filter,
  ChevronDown,
  ChevronUp,
  Check,
  History,
  Trophy,
  Star,
} from "lucide-react";

// --- THE MASTER DATABASE ---
const ALL_PLAYERS = [
  // ================= OUTSIDE HITTERS (OH) =================
  {
    id: "oh1",
    name: "Alyssa Valdez",
    number: 2,
    position: "OH",
    team: "Creamline",
    leagues: ["PVL"],
    description: "The Phenom; legendary leadership.",
    history:
      "Ateneo (2010-16) • Smart-Maynilad (2013) • PLDT (2015) • BaliPure (2016) • BOC (2016) • 3BB Nakornnont (Thailand) • Attack Line (Taiwan) • Creamline (2017-Present)",
    awards:
      "3x UAAP MVP • 4x PVL MVP • 2x V-League Finals MVP • SEA Games Flag Bearer • 4x UAAP Best Scorer",
  },
  {
    id: "oh2",
    name: "Sisi Rondina",
    number: 18,
    position: "OH",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Explosive vertical; high-energy.",
    history:
      "UST (2014-19) • Foton (2016) • Petron (2017-19) • Creamline Beach (2020-22) • Choco Mucho (2023-Present)",
    awards:
      "UAAP S81 MVP • PVL MVP (2023) • 4x UAAP Beach Volley MVP • PSL Beach Volley Champion",
  },
  {
    id: "oh3",
    name: "Jema Galanza",
    number: 15,
    position: "OH",
    team: "Creamline",
    leagues: ["PVL"],
    description: "Technical spiker; former MVP.",
    history: "Adamson (2014-18) • Creamline (2017-Present)",
    awards:
      "PVL Open MVP (2019) • PVL Finals MVP (2024) • 2x PVL Best Outside Spiker",
  },
  {
    id: "oh4",
    name: "Eya Laure",
    number: 24,
    position: "OH",
    team: "Chery Tiggo",
    leagues: ["PVL"],
    description: "Power hitter; high scoring volume.",
    history:
      "UST-HS • UST (2019-23) • Foton (2019) • Chery Tiggo (2023-Present)",
    awards:
      "UAAP Rookie of the Year • UAAP S84 Best Scorer • PVL Best Outside Spiker",
  },
  {
    id: "oh5",
    name: "Brooke Van Sickle",
    number: 10,
    position: "OH",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "PVL MVP; lethal serve.",
    history:
      "Oregon (NCAA 2016-18) • Hawaii (NCAA 2019-21) • AEL Limassol (Cyprus) • Petro Gazz (2024-Present)",
    awards:
      "PVL All-Filipino MVP (2024) • PVL Best Server • Big West Player of the Year",
  },
  {
    id: "oh6",
    name: "Ces Molina",
    number: 2,
    position: "OH",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "Veteran scorer; consistent.",
    history:
      "San Beda (2010-15) • Petron (2013-20) • Cignal (2021-24) • Farm Fresh (2025-Present)",
    awards:
      "PVL Invitational MVP (2023) • PSL Best Outside Spiker • Multiple PSL Championships",
  },
  {
    id: "oh7",
    name: "Savi Davison",
    number: 6,
    position: "OH",
    team: "PLDT",
    leagues: ["PVL"],
    description: "Fil-Canadian scoring machine.",
    history:
      "New Mexico State (NCAA 2017-20) • Oklahoma (NCAA 2021-22) • PLDT (2023-Present)",
    awards: "PVL Best Outside Spiker (2024) • WAC Player of the Year (NCAA)",
  },
  {
    id: "oh8",
    name: "Vanie Gandler",
    number: 9,
    position: "OH",
    team: "Cignal",
    leagues: ["PVL"],
    description: "Reliable scorer; heavy serve.",
    history: "Ateneo (2019-23) • Cignal (2023-Present)",
    awards: "UAAP S84 Best Server • PNVF Champions League Best OH",
  },
  {
    id: "oh9",
    name: "Bernadeth Pons",
    number: 13,
    position: "OH",
    team: "Creamline",
    leagues: ["PVL"],
    description: "Elite defense; beach volley vet.",
    history:
      "FEU (2014-18) • Petron (2016-19) • Creamline Beach (2020-21) • Creamline (2022-Present)",
    awards:
      "PVL Reinforced Finals MVP (2024) • PSL Beach Volley Champion • UAAP Beach Volley MVP",
  },
  {
    id: "oh10",
    name: "Faith Nisperos",
    number: 17,
    position: "OH",
    team: "Akari",
    leagues: ["PVL"],
    description: "High reach; heavy attacks.",
    history: "NU-Nazareth (HS) • Ateneo (2019-23) • Akari (2023-Present)",
    awards: "UAAP S84 2nd Best Outside Spiker • UAAP Jrs Finals MVP",
  },
  {
    id: "oh11",
    name: "Ara Galang",
    number: 8,
    position: "OH",
    team: "Chery Tiggo",
    leagues: ["PVL"],
    description: "Defensive ace; veteran leader.",
    history:
      "DLSU (2011-16) • F2 Logistics (2016-23) • Chery Tiggo (2024-Present)",
    awards: "UAAP S75 MVP • UAAP Rookie of the Year • PSL MVP",
  },
  {
    id: "oh12",
    name: "Grethcel Soltones",
    number: 3,
    position: "OH",
    team: "Akari",
    leagues: ["PVL"],
    description: "Lady Beast; defensive specialist.",
    history:
      "San Sebastian (2012-17) • PLDT (2015-18) • BaliPure (2016) • Petro Gazz (2019-23) • Akari (2024-Present)",
    awards: "3x NCAA MVP (S90, S91, S92) • SVL MVP • PVL Best Outside Spiker",
  },
  {
    id: "oh13",
    name: "Jovie Prado",
    number: 19,
    position: "OH",
    team: "PLDT",
    leagues: ["PVL"],
    description: "Technical hitter; floor defense ace.",
    history: "Arellano (2014-19) • Tacloban (2018) • PLDT (2019-Present)",
    awards: "NCAA Finals MVP • PVL Best Outside Spiker",
  },
  {
    id: "oh14",
    name: "Myla Pablo",
    number: 9,
    position: "OH",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "Bagyo; raw power hitter.",
    history:
      "NU (2010-15) • Pocari Sweat (2016-18) • Motolite (2019) • Petro Gazz (2021-22) • F2 (2023) • Petro Gazz (2024-Present)",
    awards:
      "2x PVL MVP (2017, 2018) • SVL Finals MVP • PVL Best Outside Spiker",
  },
  {
    id: "oh15",
    name: "Chiara Permentilla",
    number: 9,
    position: "OH",
    team: "Nxled",
    leagues: ["PVL"],
    description: "Team Captain; high energy.",
    history: "Adamson (2017-21) • Akari (2022-23) • Nxled (2023-Present)",
    awards: "UAAP Player of the Week citations • Nxled Team Captain",
  },
  {
    id: "oh16",
    name: "Fiola Ceballos",
    number: 15,
    position: "OH",
    team: "ZUS Coffee",
    leagues: ["PVL"],
    description: "Beach veteran; smart placement.",
    history:
      "CPU (College) • Generika (2016-17) • PLDT (2022-24) • ZUS Coffee (2025-Present)",
    awards: "PSL Beach Volley Champion • Unigames MVP",
  },
  {
    id: "oh17",
    name: "Des Cheng",
    number: 2,
    position: "OH",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Team Captain; elite defense.",
    history:
      "DLSU (2016-19) • F2 Logistics (2016-21) • Choco Mucho (2022-Present)",
    awards: "UAAP S79 Finals MVP • UAAP Best Server",
  },
  {
    id: "oh18",
    name: "Mean Mendrez",
    number: 4,
    position: "OH",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "High leaper; offensive spark.",
    history:
      "UE (2017-21) • Petro Gazz (2021-22) • PLDT (2022-23) • Choco Mucho (2024-Present)",
    awards: "PSL Collegiate Grand Slam 2nd Best OH",
  },
  {
    id: "oh19",
    name: "Isa Molde",
    number: 1,
    position: "OH",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Clutch player; technical shots.",
    history:
      "UP (2016-20) • Motolite (2018-19) • PLDT (2021) • Choco Mucho (2022-Present)",
    awards: "UAAP S78 Rookie of the Year • PVL Collegiate Conference MVP",
  },
  {
    id: "oh20",
    name: "Jonah Sabete",
    number: 20,
    position: "OH",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "Athletic; high energy spiker.",
    history:
      "Bulacan State U • Sta. Lucia (2017-21) • Petro Gazz (2022-Present)",
    awards: "PVL Reinforced Conference Champion (2022)",
  },
  {
    id: "oh21",
    name: "Kate Santiago",
    number: 17,
    position: "OH",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "Steady scorer for Foxies.",
    history: "Adamson (2022-23) • Farm Fresh (2023-Present)",
    awards: "UAAP Bronze Medalist",
  },
  {
    id: "oh22",
    name: "Jovelyn Gonzaga",
    number: 8,
    position: "OH",
    team: "Cignal",
    leagues: ["PVL"],
    description: "Bionic Ilongga; defensive ace.",
    history:
      "CPU (College) • RC Cola-Army (2016) • Cignal (2017-20) • Army (2021-22) • Cignal (2023-Present)",
    awards:
      "PSL MVP (2013) • PSL Best Opposite • SEA Games Beach Volley Bronze",
  },
  {
    id: "oh23",
    name: "Mich Gamit",
    number: 14,
    position: "OH",
    team: "Creamline",
    leagues: ["PVL"],
    description: "High potential; quick arm.",
    history:
      "CSB (2020-24) • Farm Fresh/ZUS (2023-24) • Creamline (2025-Present)",
    awards: "NCAA Champion (CSB)",
  },
  {
    id: "oh24",
    name: "Ivy Lacsina",
    number: 16,
    position: "OH",
    team: "Akari",
    leagues: ["PVL"],
    description: "Tall winger; converted MB.",
    history:
      "NU (2018-22) • F2 Logistics (2022-23) • Nxled (2024) • Akari (2024-Present)",
    awards: "UAAP Champion (S84) • PNVF Champions League Best MB",
  },
  {
    id: "oh25",
    name: "Jorelle Singh",
    number: 14,
    position: "OH",
    team: "Capital1",
    leagues: ["PVL"],
    description: "Heavy hitter; consistent scorer.",
    history:
      "NU (2014-18) • PLDT (2019-21) • BaliPure (2022) • Farm Fresh (2023) • Capital1 (2024-Present)",
    awards: "UAAP Champion • V-League Best Server",
  },
  {
    id: "oh26",
    name: "Shola Alvarez",
    number: 8,
    position: "OH",
    team: "Galeries",
    leagues: ["PVL", "NCAA"],
    description: "NCAA MVP and Scoring Machine.",
    history:
      "JRU (2014-18) • PLDT (2019-22) • F2 (2023) • Galeries (2024-Present)",
    awards: "NCAA S93 MVP • NCAA Best Scorer",
  },
  {
    id: "oh27",
    name: "Judith Abil",
    number: 16,
    position: "OH",
    team: "Nxled",
    leagues: ["PVL", "UAAP"],
    description: "Defensive specialist open spiker.",
    history: "UE (2015-19) • Nxled (2023-Present)",
    awards: "UE Team Captain • PVL Best Digger nominee",
  },
  {
    id: "oh28",
    name: "Tin Tiamzon",
    number: 12,
    position: "OH",
    team: "Cignal",
    leagues: ["PVL", "UAAP"],
    description: "Veteran champion spiker.",
    history: "DLSU (2015-20) • F2 (2021-23) • Cignal (2025-Present)",
    awards: "3x UAAP Champion (S78, S79, S80)",
  },
  {
    id: "oh29",
    name: "Nicole Tiamzon",
    number: 15,
    position: "OH",
    team: "Petro Gazz (Legend)",
    leagues: ["PVL", "UAAP"],
    description: "UP Legend and Founder.",
    history: "UP (2012-17) • Perlas (2017-21) • Petro Gazz (2022)",
    awards: "UAAP S78 Best Scorer • Founder Spike and Serve",
  },
  {
    id: "oh30",
    name: "Justine Dorog",
    number: 13,
    position: "OH",
    team: "Farm Fresh",
    leagues: ["PVL", "UAAP"],
    description: "Defensive ace.",
    history: "UP (2015-19) • Chery Tiggo (2020-22) • Farm Fresh (2023-Present)",
    awards: "UAAP S78 Rookie of the Year Nominee",
  },
  {
    id: "oh31",
    name: "Fille Cainglet",
    number: 15,
    position: "OH",
    team: "Creamline (Legend)",
    leagues: ["PVL", "UAAP"],
    description: 'Ateneo "Fab 5" Legend.',
    history:
      "Ateneo (2008-13) • Petron (2015) • Pocari (2017) • Creamline (2018-Present)",
    awards: "V-League Hall of Fame • PVL Champion",
  },
  {
    id: "oh32",
    name: "Jolina Dela Cruz",
    number: 11,
    position: "OH",
    team: "Farm Fresh",
    leagues: ["PVL", "UAAP"],
    description: "All-around reliable spiker.",
    history: "DLSU (2018-23) • F2 Logistics (2023) • Farm Fresh (2024-Present)",
    awards: "UAAP S85 1st Best Outside Hitter • UAAP Champion",
  },
  {
    id: "oh33",
    name: "Bella Belen",
    number: 4,
    position: "OH",
    team: "NU",
    leagues: ["UAAP", "PVL"],
    description: "2025 PVL Draft Pick #1.",
    history: "NU (S84-Present) • Capital1 (2025)",
    awards: "2x UAAP MVP • UAAP S84 Rookie-MVP",
  },
  {
    id: "oh34",
    name: "Angel Canino",
    number: 12,
    position: "OH",
    team: "DLSU",
    leagues: ["UAAP"],
    description: "UAAP S85 MVP; complete package.",
    history: "DLSU (S85-Present)",
    awards: "UAAP Rookie-MVP • 2nd Best Outside Hitter",
  },
  {
    id: "oh35",
    name: "Casiey Dongallo",
    number: 1,
    position: "OH",
    team: "UE",
    leagues: ["UAAP"],
    description: "Scoring machine; record holder.",
    history: "UE (S86-Present)",
    awards: "UAAP Best Scorer • PNVF U18 MVP",
  },
  {
    id: "oh36",
    name: "Angeline Poyos",
    number: 1,
    position: "OH",
    team: "UST",
    leagues: ["UAAP"],
    description: "UAAP S86 Rookie of the Year.",
    history: "UST (S86-Present)",
    awards: "UAAP ROY • PNVF Best Outside Spiker",
  },
  {
    id: "oh37",
    name: "Vangie Alinsug",
    number: 6,
    position: "OH",
    team: "NU",
    leagues: ["UAAP"],
    description: "Powerful open spiker.",
    history: "NU (S84-Present)",
    awards: "UAAP Champion • SSL Best Outside Spiker",
  },
  {
    id: "oh38",
    name: "Arah Panique",
    number: 18,
    position: "OH",
    team: "NU",
    leagues: ["UAAP"],
    description: "Alas Pilipinas breakout star.",
    history: "NU (S86-Present)",
    awards: "AVC Challenge Cup Bronze Medalist",
  },
  {
    id: "oh39",
    name: "Alleiah Malaluan",
    number: 6,
    position: "OH",
    team: "PLDT",
    leagues: ["PVL", "UAAP"],
    description: "2025 PVL Draft Pick #9.",
    history: "DLSU (S84-Present) • PLDT (2025)",
    awards: "UAAP Champion • UAAP Jrs MVP",
  },
  {
    id: "oh40",
    name: "Shaina Nitura",
    number: 1,
    position: "OH",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Super Rookie; top HS recruit.",
    history: "Adamson (S87-Rookie)",
    awards: "UAAP Jrs MVP",
  },
  {
    id: "oh41",
    name: "Chenie Tagaod",
    number: 9,
    position: "OH",
    team: "Akari",
    leagues: ["PVL", "UAAP"],
    description: "2025 PVL Draft Pick #10.",
    history: "FEU (S84-Present) • Akari (2025)",
    awards: "SSL Best OH",
  },
  {
    id: "oh42",
    name: "Gerzel Petallo",
    number: 15,
    position: "OH",
    team: "FEU",
    leagues: ["UAAP"],
    description: "Athletic winger; crafty.",
    history: "FEU (S85-Present)",
    awards: "UAAP Bronze",
  },
  {
    id: "oh43",
    name: "Jona Perdido",
    number: 11,
    position: "OH",
    team: "UST",
    leagues: ["UAAP"],
    description: "Explosive scorer; high energy.",
    history: "UST (S85-Present)",
    awards: "UAAP Silver",
  },
  {
    id: "oh44",
    name: "Lyann De Guzman",
    number: 16,
    position: "OH",
    team: "Nxled",
    leagues: ["PVL", "UAAP"],
    description: "2025 PVL Draft Pick #4.",
    history: "Ateneo (S84-Present) • Nxled (2025)",
    awards: "PNVF Best OH",
  },
  {
    id: "oh45",
    name: "Melody Pons",
    number: 2,
    position: "OH",
    team: "FEU",
    leagues: ["UAAP"],
    description: "Energetic; sister of Bernadeth.",
    history: "FEU (S86-Present)",
    awards: "SSL Best OH",
  },
  {
    id: "oh46",
    name: "Yesha Noceja",
    number: 20,
    position: "OH",
    team: "UP",
    leagues: ["UAAP"],
    description: "Rookie standout.",
    history: "UP (S87-Rookie)",
    awards: "UAAP Jrs Best OP",
  },
  {
    id: "oh47",
    name: "Jillian Santos",
    number: 18,
    position: "OH",
    team: "DLSU",
    leagues: ["UAAP"],
    description: "Rookie hitter; good range.",
    history: "DLSU (S87-Rookie)",
    awards: "UAAP Jrs Mythical",
  },
  {
    id: "oh48",
    name: "Red Bascon",
    number: 16,
    position: "OH",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Steady open hitter.",
    history: "Adamson (S86-Present)",
    awards: "UAAP Bronze",
  },
  {
    id: "oh49",
    name: "Vanessa Bangayan",
    number: 8,
    position: "OH",
    team: "UE",
    leagues: ["UAAP"],
    description: "Scoring option for UE.",
    history: "UE (S84-Present)",
    awards: "UE Captain",
  },
  {
    id: "oh50",
    name: "Renee Peñafiel",
    number: 14,
    position: "OH",
    team: "UST",
    leagues: ["UAAP"],
    description: "High leaping attacker.",
    history: "UST (S85-Present)",
    awards: "UAAP Silver",
  },
  {
    id: "oh51",
    name: "Celine Marsh",
    number: 19,
    position: "OH",
    team: "NU",
    leagues: ["UAAP"],
    description: "Tall open; solid blocking.",
    history: "NU (S86-Present)",
    awards: "UAAP Champion",
  },
  {
    id: "oh52",
    name: "Joan Monares",
    number: 8,
    position: "OH",
    team: "UP",
    leagues: ["UAAP"],
    description: "Tall winger.",
    history: "UP (S84-Present)",
    awards: "UP Captain",
  },
  {
    id: "oh53",
    name: "Barbie Jamili",
    number: 17,
    position: "OH",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Veteran presence.",
    history: "Adamson (S86-Present)",
    awards: "UAAP Jrs Best Server",
  },
  {
    id: "oh54",
    name: "Jade Gentapa",
    number: 8,
    position: "OH",
    team: "ZUS Coffee",
    leagues: ["PVL", "NCAA"],
    description: "NCAA Finals MVP.",
    history: "CSB • ZUS",
    awards: "NCAA MVP",
  },
  {
    id: "oh55",
    name: "Jem Menor",
    number: 15,
    position: "OH",
    team: "Arellano",
    leagues: ["NCAA"],
    description: "SSL Girls MVP.",
    history: "Arellano (NCAA)",
    awards: "SSL MVP • NCAA Rookie of the Year",
  },
  {
    id: "oh56",
    name: "Samantha Cantada",
    number: 22,
    position: "OH",
    team: "NU",
    leagues: ["UAAP"],
    description: "SSL Mindanao Best Player.",
    history: "NU (S87-Rookie)",
    awards: "SSL Best Player (Mindanao)",
  },
  {
    id: "oh57",
    name: "Lana Barrera",
    number: 6,
    position: "OH",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "SSL Visayas Best Player.",
    history: "Adamson (S87-Rookie)",
    awards: "SSL Best Player (Visayas)",
  },
  {
    id: "oh58",
    name: "Frances Mordi",
    number: 13,
    position: "OH",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Tall winger.",
    history: "Adamson (S87-Rookie)",
    awards: "",
  },
  {
    id: "oh59",
    name: "Mary Shane Reterta",
    number: 11,
    position: "OH",
    team: "DLSU",
    leagues: ["UAAP"],
    description: "DLSU reserve.",
    history: "DLSU (S87-Rookie)",
    awards: "",
  },
  {
    id: "oh60",
    name: "Myrtle Escanlar",
    number: 21,
    position: "OH",
    team: "NU",
    leagues: ["UAAP"],
    description: "Service ace.",
    history: "NU (S85-Present)",
    awards: "UAAP Champion",
  },
  {
    id: "oh61",
    name: "Kayce Balingit",
    number: 2,
    position: "OH",
    team: "UE",
    leagues: ["UAAP"],
    description: "Team Captain.",
    history: "UE (S85-Present)",
    awards: "",
  },
  {
    id: "oh62",
    name: "Kc Cepada",
    number: 1,
    position: "OH",
    team: "UE",
    leagues: ["UAAP"],
    description: "UE Spiker.",
    history: "UE (S86-Present)",
    awards: "",
  },
  {
    id: "oh63",
    name: "Beatrice Zamudio",
    number: 16,
    position: "OH",
    team: "UE",
    leagues: ["UAAP"],
    description: "Veteran.",
    history: "UE (S84-Present)",
    awards: "",
  },
  {
    id: "oh64",
    name: "Margaret Altea",
    number: 8,
    position: "OH",
    team: "UST",
    leagues: ["UAAP"],
    description: "UST hitter.",
    history: "UST (S86-Present)",
    awards: "UAAP Silver",
  },
  {
    id: "oh65",
    name: "Kyla Cordora",
    number: 21,
    position: "OH",
    team: "UST",
    leagues: ["UAAP"],
    description: "Utility.",
    history: "UST (S86-Present)",
    awards: "",
  },
  {
    id: "oh66",
    name: "Maribeth Hilongo",
    number: 7,
    position: "OH",
    team: "UST",
    leagues: ["UAAP"],
    description: "Role player.",
    history: "UST (S86-Present)",
    awards: "",
  },
  {
    id: "oh67",
    name: "Sophia Buena",
    number: 7,
    position: "OH",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Rookie.",
    history: "Ateneo (S87-Rookie)",
    awards: "",
  },
  {
    id: "oh68",
    name: "Alexia Montoro",
    number: 15,
    position: "OH",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Rookie.",
    history: "Ateneo (S87-Rookie)",
    awards: "",
  },
  {
    id: "oh69",
    name: "Fiona Arroyo",
    number: 19,
    position: "OH",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Rookie/DS.",
    history: "Ateneo (S87-Rookie)",
    awards: "",
  },
  {
    id: "oh70",
    name: "Joel Menor",
    number: 5,
    position: "OH",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Rookie.",
    history: "Adamson (S87-Rookie)",
    awards: "",
  },
  {
    id: "oh71",
    name: "Rhose Almendralejo",
    number: 6,
    position: "OH",
    team: "Tay Tung",
    leagues: ["SSL", "Provincial"],
    description: "SSL MVP.",
    history: "Bacolod Tay Tung",
    awards: "SSL Best OH • RVL MVP",
  },
  {
    id: "oh72",
    name: "Jothea Ramos",
    number: 12,
    position: "OH",
    team: "Tay Tung",
    leagues: ["SSL", "Provincial"],
    description: "Key scorer.",
    history: "Bacolod Tay Tung",
    awards: "",
  },
  {
    id: "oh73",
    name: "Rachel Tecson",
    number: 10,
    position: "OH",
    team: "USJ-R",
    leagues: ["CESAFI", "SSL"],
    description: "Cebu star.",
    history: "USJ-R",
    awards: "CESAFI Champion",
  },
  {
    id: "oh74",
    name: "Althea Sumague",
    number: 4,
    position: "OH",
    team: "DLS-Lipa",
    leagues: ["SSL", "Provincial"],
    description: "Top scorer.",
    history: "De La Salle Lipa",
    awards: "SSL Bronze",
  },
  {
    id: "oh75",
    name: "Shaila Omipon",
    number: 4,
    position: "OH",
    team: "Perpetual",
    leagues: ["NCAA"],
    description: "NCAA ROY.",
    history: "Perpetual (S98-Present)",
    awards: "NCAA ROY • 1st Best Outside Spiker",
  },
  {
    id: "oh76",
    name: "Angel Habacon",
    number: 1,
    position: "OH",
    team: "San Beda",
    leagues: ["NCAA"],
    description: "Top Scorer.",
    history: "San Beda (S99-Present)",
    awards: "NCAA Best Scorer",
  },
  {
    id: "oh77",
    name: "Mycah Go",
    number: 1,
    position: "OH",
    team: "ZUS Coffee",
    leagues: ["NCAA", "PVL"],
    description: "NCAA MVP.",
    history: "CSB • ZUS",
    awards: "NCAA MVP",
  },
  {
    id: "oh78",
    name: "Wielyn Estoque",
    number: 18,
    position: "OH",
    team: "CSB",
    leagues: ["NCAA"],
    description: "Reliable.",
    history: "CSB (S98-Present)",
    awards: "NCAA Champion",
  },
  {
    id: "oh79",
    name: "Gia Maquindang",
    number: 9,
    position: "OH",
    team: "Letran",
    leagues: ["NCAA"],
    description: "Emerging star.",
    history: "Letran (S99-Present)",
    awards: "NCAA Silver",
  },
  {
    id: "oh80",
    name: "Roxie Dela Cruz",
    number: 11,
    position: "OH",
    team: "Mapua",
    leagues: ["NCAA"],
    description: "Defensive ace.",
    history: "Mapua (S99-Present)",
    awards: "NCAA Best Receiver",
  },
  {
    id: "oh81",
    name: "Laika Tudlasan",
    number: 8,
    position: "OH",
    team: "Arellano",
    leagues: ["NCAA"],
    description: "Top Scorer.",
    history: "Arellano (S99-Present)",
    awards: "",
  },
  {
    id: "oh82",
    name: "Jen Omapas",
    number: 11,
    position: "OH",
    team: "EAC",
    leagues: ["NCAA"],
    description: "EAC Scorer.",
    history: "EAC (S100)",
    awards: "",
  },
  {
    id: "oh83",
    name: "Kath Santos",
    number: 7,
    position: "OH",
    team: "San Sebastian",
    leagues: ["NCAA"],
    description: "SSC Leader.",
    history: "SSC (S97-Present)",
    awards: "NCAA ROY",
  },
  {
    id: "oh84",
    name: "Angelica Cruz",
    number: 15,
    position: "OH",
    team: "Lyceum",
    leagues: ["NCAA"],
    description: "LPU hitter.",
    history: "LPU (S100)",
    awards: "",
  },
  {
    id: "oh85",
    name: "Johna Dolorito",
    number: 13,
    position: "OH",
    team: "Lyceum",
    leagues: ["NCAA"],
    description: "LPU reserve.",
    history: "LPU (NCAA S100)",
    awards: "",
  },
  {
    id: "oh86",
    name: "Hannah De Guzman",
    number: 15,
    position: "OH",
    team: "Mapua",
    leagues: ["NCAA"],
    description: "Mapua OH.",
    history: "Mapua (NCAA S100)",
    awards: "",
  },
  {
    id: "oh87",
    name: "Rocha Yra",
    number: 8,
    position: "OH",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "V-League OH.",
    history: "Adamson (S87)",
    awards: "",
  },
  {
    id: "oh88",
    name: "Mary Ann Aseo",
    number: 17,
    position: "OH",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "V-League OH.",
    history: "Adamson (S87)",
    awards: "",
  },
  {
    id: "oh89",
    name: "Irah Anika Jaboneta",
    number: 10,
    position: "OH",
    team: "UP",
    leagues: ["UAAP"],
    description: "Veteran.",
    history: "UP (S87)",
    awards: "",
  },
  {
    id: "oh90",
    name: "Marie Joy Aseo",
    number: 17,
    position: "OH",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "V-League OH.",
    history: "Adamson (S87)",
    awards: "",
  },

  // ================= OPPOSITE HITTERS (OP) =================
  {
    id: "op1",
    name: "Tots Carlos",
    number: 18,
    position: "OP",
    team: "Creamline",
    leagues: ["PVL"],
    description: "Multiple MVP; versatile.",
    history: "UP • Creamline",
    awards: "3x PVL MVP • 2x PVL Best Opposite Spiker • PVL Finals MVP",
  },
  {
    id: "op2",
    name: "Mylene Paat",
    number: 7,
    position: "OP",
    team: "Chery Tiggo",
    leagues: ["PVL"],
    description: "Lefty veteran.",
    history: "Adamson • Chery Tiggo",
    awards: "PVL MVP",
  },
  {
    id: "op3",
    name: "Michele Gumabao",
    number: 7,
    position: "OP",
    team: "Creamline",
    leagues: ["PVL"],
    description: "Veteran leader.",
    history: "DLSU • Creamline",
    awards: "UAAP Finals MVP",
  },
  {
    id: "op4",
    name: "Kim Kianna Dy",
    number: 11,
    position: "OP",
    team: "PLDT",
    leagues: ["PVL"],
    description: "KKD; clutch scorer.",
    history: "DLSU • PLDT",
    awards: "UAAP Finals MVP",
  },
  {
    id: "op5",
    name: "Kat Tolentino",
    number: 10,
    position: "OP",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Tall wall.",
    history: "Ateneo • Choco Mucho",
    awards: "PVL Best OP",
  },
  {
    id: "op6",
    name: "Aiza Maizo-Pontillas",
    number: 8,
    position: "OP",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "Lefty legend.",
    history: "UST • Petro Gazz",
    awards: "UAAP Finals MVP",
  },
  {
    id: "op7",
    name: "Trisha Tubu",
    number: 9,
    position: "OP",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "Lefty power.",
    history: "Adamson • Farm Fresh",
    awards: "PVL Rising Star",
  },
  {
    id: "op8",
    name: "Gayle Pascual",
    number: 19,
    position: "OP",
    team: "ZUS Coffee",
    leagues: ["PVL", "NCAA"],
    description: "NCAA MVP.",
    history: "CSB • ZUS",
    awards: "2x NCAA MVP",
  },
  {
    id: "op9",
    name: "Dindin Santiago",
    number: 6,
    position: "OP",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Veteran power.",
    history: "NU • Choco Mucho",
    awards: "PSL Champion",
  },
  {
    id: "op10",
    name: "Leila Cruz",
    number: 12,
    position: "OP",
    team: "Capital1",
    leagues: ["PVL"],
    description: "Rookie pick.",
    history: "DLSU • Capital1",
    awards: "UAAP Champion",
  },
  {
    id: "op11",
    name: "Lycha Ebon",
    number: 2,
    position: "OP",
    team: "Nxled",
    leagues: ["PVL"],
    description: "Lefty scorer.",
    history: "FEU • Nxled",
    awards: "UAAP Player of Week",
  },
  {
    id: "op12",
    name: "Caitlin Viray",
    number: 16,
    position: "OP",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "Technical lefty.",
    history: "UST • Farm Fresh",
    awards: "UAAP Silver",
  },
  {
    id: "op13",
    name: "Eli Soyud",
    number: 24,
    position: "OP",
    team: "Akari",
    leagues: ["PVL"],
    description: "Lefty; high leap.",
    history: "Adamson • Akari",
    awards: "UAAP Best OP",
  },
  {
    id: "op14",
    name: "Erika Santos",
    number: 19,
    position: "OP",
    team: "Cignal",
    leagues: ["PVL"],
    description: "High vertical.",
    history: "PLDT • Cignal",
    awards: "PVL Bronze",
  },
  {
    id: "op15",
    name: "Jerrili Malabanan",
    number: 14,
    position: "OP",
    team: "Capital1",
    leagues: ["PVL"],
    description: "Smart hitter.",
    history: "FEU • Capital1",
    awards: "UAAP Silver",
  },
  {
    id: "op16",
    name: "Ceasa Pinar",
    number: 6,
    position: "OP",
    team: "Akari",
    leagues: ["PVL"],
    description: "Lefty power.",
    history: "Adamson • Akari",
    awards: "PVL Collegiate Champ",
  },
  {
    id: "op17",
    name: "May Luna",
    number: 10,
    position: "OP",
    team: "Cignal",
    leagues: ["PVL"],
    description: "Utility spiker.",
    history: "DLSU • Cignal",
    awards: "3x UAAP Champion",
  },
  {
    id: "op18",
    name: "Ypril Tapia",
    number: 14,
    position: "OP",
    team: "Capital1",
    leagues: ["PVL"],
    description: "Energetic.",
    history: "UST • Capital1",
    awards: "UAAP Silver",
  },
  {
    id: "op19",
    name: "France Ronquillo",
    number: 13,
    position: "OP",
    team: "Galeries",
    leagues: ["PVL"],
    description: "Solid offense.",
    history: "NU • Galeries",
    awards: "UAAP Champion",
  },
  {
    id: "op20",
    name: "Ayesha Juegos",
    number: 11,
    position: "OP",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Rookie power.",
    history: "Adamson • Choco Mucho",
    awards: "UAAP Bronze",
  },
  {
    id: "op21",
    name: "Necole Ebuen",
    number: 15,
    position: "OP",
    team: "Akari",
    leagues: ["PVL", "NCAA"],
    description: "NCAA MVP.",
    history: "Arellano • Akari",
    awards: "NCAA MVP",
  },
  {
    id: "op22",
    name: "Gyra Barroga",
    number: 14,
    position: "OP",
    team: "Cignal",
    leagues: ["PVL"],
    description: "Versatile.",
    history: "DLSU • Cignal",
    awards: "UAAP Champion",
  },
  {
    id: "op23",
    name: "Aiko Urdas",
    number: 9,
    position: "OP",
    team: "Galeries",
    leagues: ["PVL"],
    description: "Powerful lefty.",
    history: "NU • Galeries",
    awards: "V-League Best OP",
  },
  {
    id: "op24",
    name: "Alyssa Solomon",
    number: 17,
    position: "OP",
    team: "NU",
    leagues: ["UAAP"],
    description: "6'2\" Tower.",
    history: "NU (S84-Present)",
    awards: "UAAP S86 Finals MVP • 2x UAAP Best Opposite Spiker • SSL MVP",
  },
  {
    id: "op25",
    name: "Shevana Laput",
    number: 6,
    position: "OP",
    team: "DLSU",
    leagues: ["UAAP"],
    description: "6'1\" Powerhouse.",
    history: "DLSU (S85-Present)",
    awards: "SSL MVP",
  },
  {
    id: "op26",
    name: "Regina Jurado",
    number: 14,
    position: "OP",
    team: "UST",
    leagues: ["UAAP"],
    description: "Wicked serve.",
    history: "UST (S85-Present)",
    awards: "UAAP Silver",
  },
  {
    id: "op27",
    name: "Faida Bakanke",
    number: 1,
    position: "OP",
    team: "FEU",
    leagues: ["UAAP"],
    description: "Tall powerful spiker.",
    history: "FEU (S86-Present)",
    awards: "SSL Best OP",
  },
  {
    id: "op28",
    name: "Kianne Olango",
    number: 6,
    position: "OP",
    team: "UP",
    leagues: ["UAAP"],
    description: "SSL 2025 Top Scorer.",
    history: "UP (S87-Rookie)",
    awards: "SSL Best OP",
  },
  {
    id: "op29",
    name: "Baby Jyne Soreño",
    number: 16,
    position: "OP",
    team: "Chery Tiggo",
    leagues: ["UAAP", "PVL"],
    description: "2025 PVL Draft Pick #8.",
    history: "DLSU (S82-Present) • Chery Tiggo (2025)",
    awards: "UAAP Champion",
  },
  {
    id: "op30",
    name: "Aliah Ysulan",
    number: 3,
    position: "OP",
    team: "UP",
    leagues: ["UAAP"],
    description: "Rookie opposite.",
    history: "UP (S87-Rookie)",
    awards: "Palaro Standout",
  },
  {
    id: "op31",
    name: "Jennifer Delos Santos",
    number: 6,
    position: "OP",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Solid opposite.",
    history: "Ateneo (S85-Present)",
    awards: "V-League Best OP",
  },
  {
    id: "op32",
    name: "Reyann Cañete",
    number: 12,
    position: "OP",
    team: "San Beda",
    leagues: ["NCAA"],
    description: "NCAA Best OP.",
    history: "San Beda (S99-Present)",
    awards: "NCAA Best Opposite",
  },
  {
    id: "op33",
    name: "Jaja Tulang",
    number: 15,
    position: "OP",
    team: "Lyceum",
    leagues: ["NCAA"],
    description: "LPU Scorer.",
    history: "LPU (S99-Present)",
    awards: "NCAA Best Opposite",
  },
  {
    id: "op34",
    name: "Ana Mikaela Pingris",
    number: 7,
    position: "OP",
    team: "Tay Tung",
    leagues: ["SSL", "Provincial"],
    description: "SSL Best OP.",
    history: "Bacolod Tay Tung",
    awards: "SSL Best Opposite",
  },
  {
    id: "op35",
    name: "Ashlee Knop",
    number: 3,
    position: "OP",
    team: "UST",
    leagues: ["UAAP"],
    description: "Opposite.",
    history: "UST (S87)",
    awards: "",
  },
  {
    id: "op36",
    name: "Ashley Cañete",
    number: 14,
    position: "OP",
    team: "UE",
    leagues: ["UAAP"],
    description: "Utility.",
    history: "UE (S86-Present)",
    awards: "",
  },
  {
    id: "op37",
    name: "Roan Enriquez",
    number: 13,
    position: "OP",
    team: "UE",
    leagues: ["UAAP"],
    description: "Utility.",
    history: "UE (S86-Present)",
    awards: "",
  },
  {
    id: "op38",
    name: "Kc Cepada",
    number: 1,
    position: "OP",
    team: "UE",
    leagues: ["UAAP"],
    description: "Utility.",
    history: "UE (S86-Present)",
    awards: "",
  },
  {
    id: "op39",
    name: "Alyzza Devosora",
    number: 13,
    position: "OP",
    team: "FEU",
    leagues: ["UAAP"],
    description: "FEU opposite.",
    history: "FEU (S86-Present)",
    awards: "UAAP Bronze",
  },
  {
    id: "op40",
    name: "Denise Lauchengco",
    number: 19,
    position: "OP",
    team: "UP",
    leagues: ["UAAP"],
    description: "Versatile.",
    history: "UP (S87-Rookie)",
    awards: "NCAA Jrs Champ",
  },
  {
    id: "op41",
    name: "Katherine Cortez",
    number: 5,
    position: "OP",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Ateneo opposite.",
    history: "Ateneo (S87-Rookie)",
    awards: "Ateneo Rookie",
  },
  {
    id: "op42",
    name: "Zey Pacia",
    number: 6,
    position: "OP",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Ateneo OP.",
    history: "Ateneo (S87)",
    awards: "",
  },
  {
    id: "op43",
    name: "Geezel Tsunashima",
    number: 11,
    position: "OP",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Japanese-Filipino.",
    history: "Ateneo (S87)",
    awards: "",
  },
  {
    id: "op44",
    name: "May Ann Nuque",
    number: 6,
    position: "OP",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Steady opposite.",
    history: "Adamson (S86-Present)",
    awards: "UAAP Bronze",
  },
  {
    id: "op45",
    name: "Abegail Segui",
    number: 18,
    position: "OP",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Adamson OP.",
    history: "Adamson (S87)",
    awards: "",
  },
  {
    id: "op46",
    name: "Leanah Solis",
    number: 6,
    position: "OP",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Adamson OP.",
    history: "Adamson (S87)",
    awards: "",
  },

  // ================= MIDDLE BLOCKERS (MB) =================
  // --- PVL PROS ---
  {
    id: "mb1",
    name: "Thea Gagate",
    number: 13,
    position: "MB",
    team: "ZUS Coffee",
    leagues: ["PVL"],
    description: "Drafted No. 1.",
    history: "DLSU • ZUS",
    awards: "3x UAAP Best MB",
  },
  {
    id: "mb2",
    name: "Jaja Santiago",
    number: 3,
    position: "MB",
    team: "JT Marvelous",
    leagues: ["International"],
    description: "World Class.",
    history: "NU • JT Marvelous",
    awards: "UAAP MVP • Japan Best MB",
  },
  {
    id: "mb3",
    name: "Maddie Madayag",
    number: 17,
    position: "MB",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Madzilla.",
    history: "Ateneo • Choco Mucho",
    awards: "PVL Best MB",
  },
  {
    id: "mb4",
    name: "Majoy Baron",
    number: 10,
    position: "MB",
    team: "PLDT",
    leagues: ["PVL"],
    description: "Former MVP.",
    history: "DLSU • PLDT",
    awards: "UAAP MVP",
  },
  {
    id: "mb5",
    name: "Jeanette Panaga",
    number: 18,
    position: "MB",
    team: "Creamline",
    leagues: ["PVL"],
    description: "Pangs.",
    history: "CSB • Creamline",
    awards: "2x NCAA MVP",
  },
  {
    id: "mb6",
    name: "Dell Palomata",
    number: 14,
    position: "MB",
    team: "PLDT",
    leagues: ["PVL"],
    description: "NT Mainstay.",
    history: "Air Force • PLDT",
    awards: "PVL Best MB",
  },
  {
    id: "mb7",
    name: "Fifi Sharma",
    number: 11,
    position: "MB",
    team: "Akari",
    leagues: ["PVL"],
    description: "Quick attacks.",
    history: "DLSU • Akari",
    awards: "UAAP Champion",
  },
  {
    id: "mb8",
    name: "Ria Meneses",
    number: 19,
    position: "MB",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "Blocking ace.",
    history: "UST • Farm Fresh",
    awards: "3x PVL Best MB",
  },
  {
    id: "mb9",
    name: "Remy Palma",
    number: 5,
    position: "MB",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "Captain.",
    history: "FEU • Petro Gazz",
    awards: "PVL Champion",
  },
  {
    id: "mb10",
    name: "Ced Domingo",
    number: 13,
    position: "MB",
    team: "Akari",
    leagues: ["PVL"],
    description: "FMVP.",
    history: "FEU • Creamline • Akari",
    awards: "PVL Finals MVP",
  },
  {
    id: "mb11",
    name: "Aby Maraño",
    number: 2,
    position: "MB",
    team: "Chery Tiggo",
    leagues: ["PVL"],
    description: "Beast mode.",
    history: "DLSU • Chery Tiggo",
    awards: "2x UAAP MVP",
  },
  {
    id: "mb12",
    name: "MJ Phillips",
    number: 13,
    position: "MB",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "Strong presence.",
    history: "Juniata • Petro Gazz",
    awards: "PVL Best MB",
  },
  {
    id: "mb13",
    name: "Bea De Leon",
    number: 14,
    position: "MB",
    team: "Creamline",
    leagues: ["PVL"],
    description: "Heart and soul.",
    history: "Ateneo • Creamline",
    awards: "UAAP Finals MVP",
  },
  {
    id: "mb14",
    name: "Lorene Toring",
    number: 4,
    position: "MB",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "Young star.",
    history: "Adamson • Farm Fresh",
    awards: "PVL Rising Star",
  },
  {
    id: "mb15",
    name: "Cherry Nunag",
    number: 12,
    position: "MB",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Fast arm.",
    history: "Petro Gazz • Choco Mucho",
    awards: "PVL Best MB",
  },
  {
    id: "mb16",
    name: "Roselle Baliton",
    number: 12,
    position: "MB",
    team: "Galeries",
    leagues: ["PVL"],
    description: "Tall setter/middle.",
    history: "UE • Galeries",
    awards: "PSL Best MB",
  },
  {
    id: "mb17",
    name: "Maika Ortiz",
    number: 18,
    position: "MB",
    team: "ZUS Coffee",
    leagues: ["PVL"],
    description: "Veteran.",
    history: "UST • ZUS",
    awards: "V-League MVP",
  },
  {
    id: "mb18",
    name: "Mika Reyes",
    number: 3,
    position: "MB",
    team: "PLDT",
    leagues: ["PVL"],
    description: "Swag Queen.",
    history: "DLSU • PLDT",
    awards: "4x PSL Best MB",
  },
  {
    id: "mb19",
    name: "Cza Carandang",
    number: 16,
    position: "MB",
    team: "Chery Tiggo",
    leagues: ["PVL"],
    description: "Quick middle.",
    history: "FEU • Chery Tiggo",
    awards: "PVL Champion",
  },
  {
    id: "mb20",
    name: "Ranya Musa",
    number: 16,
    position: "MB",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "Tall wall.",
    history: "CSB • Petro Gazz",
    awards: "NCAA Best MB",
  },
  {
    id: "mb21",
    name: "Joy Dacoron",
    number: 5,
    position: "MB",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "Energetic.",
    history: "Adamson • Petro Gazz",
    awards: "PVL Champion",
  },
  {
    id: "mb22",
    name: "Des Clemente",
    number: 16,
    position: "MB",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "Transferred.",
    history: "UP • Farm Fresh",
    awards: "PSL Champion",
  },
  {
    id: "mb23",
    name: "Ethan Arce",
    number: 17,
    position: "MB",
    team: "Cignal",
    leagues: ["PVL"],
    description: "Transferred.",
    history: "UP • Cignal",
    awards: "UAAP Jrs Best MB",
  },
  {
    id: "mb24",
    name: "Lia Pelaga",
    number: 5,
    position: "MB",
    team: "Galeries",
    leagues: ["PVL"],
    description: "Transferred.",
    history: "UE • Galeries",
    awards: "UE Captain",
  },
  {
    id: "mb25",
    name: "Lorie Bernardo",
    number: 9,
    position: "MB",
    team: "Creamline",
    leagues: ["PVL"],
    description: "Reliable backup.",
    history: "UP • Creamline",
    awards: "PVL Champion",
  },
  {
    id: "mb26",
    name: "Seth Rodriguez",
    number: 4,
    position: "MB",
    team: "Chery Tiggo",
    leagues: ["PVL"],
    description: "Veteran.",
    history: "UP • Chery Tiggo",
    awards: "PVL Champion",
  },
  {
    id: "mb27",
    name: "Lut Malaluan",
    number: 14,
    position: "MB",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Muscular.",
    history: "PLDT • Choco Mucho",
    awards: "NCAA Champion",
  },
  {
    id: "mb28",
    name: "Aduke Ogunsanya",
    number: 13,
    position: "MB",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Recovering.",
    history: "DLSU • Choco Mucho",
    awards: "UAAP Champion",
  },
  {
    id: "mb29",
    name: "Andrea Marzan",
    number: 14,
    position: "MB",
    team: "Galeries",
    leagues: ["PVL"],
    description: "Veteran.",
    history: "Arellano • Galeries",
    awards: "NCAA Champion",
  },
  {
    id: "mb30",
    name: "Zam Nolasco",
    number: 4,
    position: "MB",
    team: "CSB",
    leagues: ["NCAA"],
    description: "NCAA Best Blocker.",
    history: "CSB",
    awards: "NCAA Best MB",
  },
  {
    id: "mb31",
    name: "Caroline Santos",
    number: 15,
    position: "MB",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "Former DLSU.",
    history: "DLSU • Farm Fresh",
    awards: "UAAP Champion",
  },
  {
    id: "mb32",
    name: "Kathy Bersola",
    number: 13,
    position: "MB",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "The Doctor.",
    history: "UP • Petro Gazz",
    awards: "UAAP Best Blocker",
  },
  {
    id: "mb33",
    name: "Jean Asis",
    number: 19,
    position: "MB",
    team: "Galeries",
    leagues: ["PVL", "UAAP"],
    description: "2025 PVL Draft Pick #2.",
    history: "FEU • Galeries",
    awards: "V-League Best MB",
  },
  {
    id: "mb34",
    name: "AC Miner",
    number: 14,
    position: "MB",
    team: "ZUS Coffee",
    leagues: ["PVL", "UAAP"],
    description: "2025 PVL Draft Pick #5.",
    history: "Ateneo • ZUS",
    awards: "V-League Best MB",
  },
  {
    id: "mb35",
    name: "Erin Pangilinan",
    number: 16,
    position: "MB",
    team: "Cignal",
    leagues: ["PVL", "UAAP"],
    description: "2025 PVL Draft Pick #6.",
    history: "NU • Cignal",
    awards: "UAAP Champion",
  },
  {
    id: "mb36",
    name: "Sheena Toring",
    number: 8,
    position: "MB",
    team: "Creamline",
    leagues: ["PVL", "UAAP"],
    description: "2025 PVL Draft Pick #12.",
    history: "NU • Creamline",
    awards: "SSL Best MB",
  },

  // --- UAAP S87 STARS (MB) ---
  {
    id: "mb37",
    name: "Nina Ytang",
    number: 12,
    position: "MB",
    team: "UP",
    leagues: ["UAAP"],
    description: "Best Blocker.",
    history: "UP (S84-Present)",
    awards: "UAAP Best Blocker",
  },
  {
    id: "mb38",
    name: "Margaret Banagua",
    number: 15,
    position: "MB",
    team: "UST",
    leagues: ["UAAP"],
    description: "Rookie revelation.",
    history: "UST (S86-Present)",
    awards: "UAAP Silver",
  },
  {
    id: "mb39",
    name: "Amie Provido",
    number: 16,
    position: "MB",
    team: "DLSU",
    leagues: ["UAAP"],
    description: "Smart middle.",
    history: "DLSU (S85-Present)",
    awards: "UAAP Champion",
  },
  {
    id: "mb40",
    name: "Mitzi Panangin",
    number: 8,
    position: "MB",
    team: "FEU",
    leagues: ["UAAP"],
    description: "Aggressive net.",
    history: "FEU (S85-Present)",
    awards: "UAAP Bronze",
  },
  {
    id: "mb41",
    name: "Kassandra Doering",
    number: 12,
    position: "MB",
    team: "UP",
    leagues: ["UAAP"],
    description: "Fil-Am rookie.",
    history: "UP (S87-Rookie)",
    awards: "NCAA Div II",
  },
  {
    id: "mb42",
    name: "Clarisse Loresco",
    number: 10,
    position: "MB",
    team: "FEU",
    leagues: ["UAAP"],
    description: "Rookie potential.",
    history: "FEU (S87-Rookie)",
    awards: "UAAP Jrs Mythical",
  },
  {
    id: "mb43",
    name: "Jessa Ordiales",
    number: 8,
    position: "MB",
    team: "DLSU",
    leagues: ["UAAP"],
    description: "Returning.",
    history: "DLSU (S85-Present)",
    awards: "UAAP Bronze",
  },
  {
    id: "mb44",
    name: "Trixie Demontano",
    number: 11,
    position: "MB",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Middle blocker.",
    history: "Adamson (S87-Rookie)",
    awards: "UAAP Jrs Champ",
  },
  {
    id: "mb45",
    name: "Bianca Plaza",
    number: 12,
    position: "MB",
    team: "UST",
    leagues: ["UAAP"],
    description: "Reliable.",
    history: "UST (S86-Present)",
    awards: "UAAP Silver",
  },
  {
    id: "mb46",
    name: "Bienne Bansil",
    number: 13,
    position: "MB",
    team: "UP",
    leagues: ["UAAP"],
    description: "Rookie tower.",
    history: "UP (S87-Rookie)",
    awards: "UAAP Jrs Best MB",
  },
  {
    id: "mb47",
    name: "Katrina Del Castillo",
    number: 22,
    position: "MB",
    team: "DLSU",
    leagues: ["UAAP"],
    description: "Tall rookie.",
    history: "DLSU (S87-Rookie)",
    awards: "UAAP Jrs Standout",
  },
  {
    id: "mb48",
    name: "Alexa Mata",
    number: 10,
    position: "MB",
    team: "NU",
    leagues: ["UAAP"],
    description: "Reserve middle.",
    history: "NU (S86-Present)",
    awards: "UAAP Champion",
  },
  {
    id: "mb49",
    name: "Minierva Maaya",
    number: 17,
    position: "MB",
    team: "NU",
    leagues: ["UAAP"],
    description: "Reserve middle.",
    history: "NU (S86-Present)",
    awards: "UAAP Champion",
  },
  {
    id: "mb50",
    name: "Abbu Athena",
    number: 11,
    position: "MB",
    team: "UST",
    leagues: ["UAAP"],
    description: "UST reserve.",
    history: "UST (S87-Rookie)",
    awards: "UST Jrs",
  },
  {
    id: "mb51",
    name: "Aishat Bello",
    number: 9,
    position: "MB",
    team: "NU",
    leagues: ["UAAP"],
    description: "Nigerian import.",
    history: "NU (S87-Present)",
    awards: "UAAP Import",
  },
  {
    id: "mb52",
    name: "Waje Arlene",
    number: 23,
    position: "MB",
    team: "UST",
    leagues: ["UAAP"],
    description: "UST reserve.",
    history: "UST (S86-Present)",
    awards: "UAAP Silver",
  },
  {
    id: "mb53",
    name: "Jen Villegas",
    number: 3,
    position: "MB",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Adamson blocker.",
    history: "Adamson (S86-Present)",
    awards: "UAAP Bronze",
  },
  {
    id: "mb54",
    name: "Princess Dote",
    number: 4,
    position: "MB",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Adamson blocker.",
    history: "Adamson (S86-Present)",
    awards: "UAAP Bronze",
  },
  {
    id: "mb55",
    name: "Kamille Dionisio",
    number: 10,
    position: "MB",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Adamson blocker.",
    history: "Adamson (S87-Present)",
    awards: "UAAP Jrs",
  },
  {
    id: "mb56",
    name: "Yvana Sulit",
    number: 8,
    position: "MB",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Ateneo blocker.",
    history: "Ateneo (S86-Present)",
    awards: "Ateneo Starter",
  },
  {
    id: "mb57",
    name: "Jihan Chuatico",
    number: 12,
    position: "MB",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Ateneo blocker.",
    history: "Ateneo (S87-Rookie)",
    awards: "Ateneo Rookie",
  },
  {
    id: "mb58",
    name: "Robielle Silla",
    number: 13,
    position: "MB",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Ateneo blocker.",
    history: "Ateneo (S86-Present)",
    awards: "Ateneo Starter",
  },
  {
    id: "mb59",
    name: "Lovely Lopez",
    number: 6,
    position: "MB",
    team: "FEU",
    leagues: ["UAAP"],
    description: "FEU blocker.",
    history: "FEU (S87-Rookie)",
    awards: "FEU Rookie",
  },
  {
    id: "mb60",
    name: "Jazlyn Ellarina",
    number: 21,
    position: "MB",
    team: "FEU",
    leagues: ["UAAP"],
    description: "FEU blocker.",
    history: "FEU (S87-Present)",
    awards: "FEU Reserve",
  },
  {
    id: "mb61",
    name: "Keshia Famulagan",
    number: 11,
    position: "MB",
    team: "UE",
    leagues: ["UAAP"],
    description: "UE blocker.",
    history: "UE (S86-Present)",
    awards: "UE Starter",
  },
  {
    id: "mb62",
    name: "Roan Enriquez",
    number: 13,
    position: "MB",
    team: "UE",
    leagues: ["UAAP"],
    description: "UE blocker.",
    history: "UE (S86-Present)",
    awards: "UE Starter",
  },
  {
    id: "mb63",
    name: "Riza Nogales",
    number: 19,
    position: "MB",
    team: "UE",
    leagues: ["UAAP"],
    description: "UE blocker.",
    history: "UE (S86-Present)",
    awards: "UE Starter",
  },
  {
    id: "mb64",
    name: "Dannica Celis",
    number: 7,
    position: "MB",
    team: "UP",
    leagues: ["UAAP"],
    description: "Veteran middle.",
    history: "UP (S84-Present)",
    awards: "UP Captain",
  },
  {
    id: "mb65",
    name: "Blessing Unekwe",
    number: 25,
    position: "MB",
    team: "UST",
    leagues: ["UAAP"],
    description: "UST reserve.",
    history: "UST (S87-Present)",
    awards: "UST Jrs",
  },
  {
    id: "mb66",
    name: "Hiromi Osada",
    number: 10,
    position: "MB",
    team: "Lyceum",
    leagues: ["NCAA"],
    description: "LPU Tower.",
    history: "Lyceum (S99-Present)",
    awards: "NCAA Best Middle Blocker",
  },
  {
    id: "mb67",
    name: "Camila Bartolome",
    number: 9,
    position: "MB",
    team: "Tay Tung",
    leagues: ["SSL", "Provincial"],
    description: "SSL Finalist.",
    history: "Bacolod Tay Tung",
    awards: "SSL Silver Medalist",
  },
  {
    id: "mb68",
    name: "Maxene Sumagaysay",
    number: 11,
    position: "MB",
    team: "DLS-Lipa",
    leagues: ["SSL", "Provincial"],
    description: "Green Stallion.",
    history: "De La Salle Lipa",
    awards: "SSL Bronze Medalist",
  },
  {
    id: "mb69",
    name: "Mary Ann Grace Del Moral",
    number: 5,
    position: "MB",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "V-League MB.",
    history: "Adamson (S87)",
    awards: "Adamson Jrs",
  },
  {
    id: "mb70",
    name: "Frisha Divinagracia",
    number: 20,
    position: "MB",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "V-League MB.",
    history: "Adamson (S87)",
    awards: "",
  },
  {
    id: "mb71",
    name: "Lhouriz Tuddao",
    number: 3,
    position: "MB",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "V-League MB.",
    history: "Adamson (S87)",
    awards: "",
  },
  {
    id: "mb72",
    name: "Zamantha Nolasco",
    number: 4,
    position: "MB",
    team: "CSB",
    leagues: ["NCAA"],
    description: "NCAA MB.",
    history: "CSB (NCAA S100)",
    awards: "NCAA Best MB",
  },
  {
    id: "mb73",
    name: "Angelique Ledesma",
    number: 5,
    position: "MB",
    team: "Letran",
    leagues: ["NCAA"],
    description: "Letran MB.",
    history: "Letran (NCAA S100)",
    awards: "",
  },
  {
    id: "mb74",
    name: "Tere Manalo",
    number: 7,
    position: "MB",
    team: "Mapua",
    leagues: ["NCAA"],
    description: "Mapua MB.",
    history: "Mapua (NCAA S100)",
    awards: "",
  },
  {
    id: "mb75",
    name: "Winnie Bedaña",
    number: 3,
    position: "MB",
    team: "Perpetual",
    leagues: ["NCAA"],
    description: "Perpetual MB.",
    history: "Perpetual (S98-Present)",
    awards: "",
  },
  {
    id: "mb76",
    name: "KJ Dionisio",
    number: 10,
    position: "MB",
    team: "San Sebastian",
    leagues: ["NCAA"],
    description: "SSC MB.",
    history: "SSC (S97-Present)",
    awards: "",
  },
  {
    id: "mb77",
    name: "Maliey Amante",
    number: 8,
    position: "MB",
    team: "JRU",
    leagues: ["NCAA"],
    description: "JRU MB.",
    history: "JRU (S99-Present)",
    awards: "",
  },

  // ================= SETTERS (S) =================
  // --- PVL PROS ---
  {
    id: "s1",
    name: "Jia De Guzman",
    number: 12,
    position: "S",
    team: "Creamline",
    leagues: ["PVL"],
    description: "The Maestro.",
    history: "Ateneo • Creamline",
    awards: "8x PVL Best Setter",
  },
  {
    id: "s2",
    name: "Kim Fajardo",
    number: 9,
    position: "S",
    team: "PLDT",
    leagues: ["PVL"],
    description: "KAF.",
    history: "DLSU • PLDT",
    awards: "3x UAAP Best Setter",
  },
  {
    id: "s3",
    name: "Kyle Negrito",
    number: 11,
    position: "S",
    team: "Creamline",
    leagues: ["PVL"],
    description: "Aggressive.",
    history: "FEU • Creamline",
    awards: "PVL Best Setter",
  },
  {
    id: "s4",
    name: "Gel Cayuna",
    number: 16,
    position: "S",
    team: "Cignal",
    leagues: ["PVL"],
    description: "Deceptive.",
    history: "FEU • Cignal",
    awards: "2x PVL Best Setter",
  },
  {
    id: "s5",
    name: "Mars Alba",
    number: 5,
    position: "S",
    team: "Akari",
    leagues: ["PVL"],
    description: "Offensive.",
    history: "DLSU • Akari",
    awards: "UAAP Finals MVP",
  },
  {
    id: "s6",
    name: "Julia Coronel",
    number: 6,
    position: "S",
    team: "Galeries",
    leagues: ["PVL"],
    description: "6'0\" Setter.",
    history: "DLSU • Galeries",
    awards: "UAAP Champion",
  },
  {
    id: "s7",
    name: "Louie Romero",
    number: 2,
    position: "S",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "Classic technique.",
    history: "Adamson • Farm Fresh",
    awards: "PVL Collegiate Best Setter",
  },
  {
    id: "s8",
    name: "Cloanne Mondoñedo",
    number: 12,
    position: "S",
    team: "ZUS Coffee",
    leagues: ["PVL", "NCAA"],
    description: "NCAA Best Setter.",
    history: "CSB • ZUS",
    awards: "NCAA Finals MVP",
  },
  {
    id: "s9",
    name: "Deanna Wong",
    number: 3,
    position: "S",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Fan favorite.",
    history: "Ateneo • Choco Mucho",
    awards: "UAAP Best Setter",
  },
  {
    id: "s10",
    name: "Jem Ferrer",
    number: 12,
    position: "S",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Veteran poise.",
    history: "Ateneo • Choco Mucho",
    awards: "3x UAAP Best Setter",
  },
  {
    id: "s11",
    name: "Mich Cobb",
    number: 10,
    position: "S",
    team: "Akari",
    leagues: ["PVL"],
    description: "Tall setter.",
    history: "DLSU • Akari",
    awards: "UAAP Champion",
  },
  {
    id: "s12",
    name: "Kamille Cal",
    number: 6,
    position: "S",
    team: "Akari",
    leagues: ["PVL"],
    description: "Tall lefty.",
    history: "NU • Akari",
    awards: "UAAP Champion",
  },
  {
    id: "s13",
    name: "Rhea Dimaculangan",
    number: 15,
    position: "S",
    team: "Creamline",
    leagues: ["PVL"],
    description: "Veteran.",
    history: "UST • Creamline",
    awards: "UAAP Finals MVP",
  },
  {
    id: "s14",
    name: "Angelica Alcantara",
    number: 9,
    position: "S",
    team: "PLDT",
    leagues: ["PVL"],
    description: "Rising.",
    history: "Adamson • PLDT",
    awards: "UAAP Bronze",
  },
  {
    id: "s15",
    name: "Djanel Cheng",
    number: 2,
    position: "S",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "Agile.",
    history: "CSB • Petro Gazz",
    awards: "NCAA Best Setter",
  },
  {
    id: "s16",
    name: "Chie Saet",
    number: 17,
    position: "S",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "Veteran.",
    history: "DLSU • Petro Gazz",
    awards: "UAAP Best Setter",
  },
  {
    id: "s17",
    name: "Iris Tolenada",
    number: 1,
    position: "S",
    team: "Capital1",
    leagues: ["PVL"],
    description: "Vocal leader.",
    history: "Capital1",
    awards: "PSL Best Setter",
  },
  {
    id: "s18",
    name: "Heart Villaflores",
    number: 5,
    position: "S",
    team: "Letran",
    leagues: ["NCAA"],
    description: "Key playmaker.",
    history: "Letran (NCAA)",
    awards: "NCAA Silver",
  },
  {
    id: "s19",
    name: "Nikka Yandoc",
    number: 8,
    position: "S",
    team: "Capital1",
    leagues: ["PVL"],
    description: "Solid backup.",
    history: "Adamson • Capital1",
    awards: "UAAP Bronze",
  },
  {
    id: "s20",
    name: "Maji Mangulabnan",
    number: 24,
    position: "S",
    team: "Nxled",
    leagues: ["PVL"],
    description: "Steady hand.",
    history: "UST • Nxled",
    awards: "UAAP Silver",
  },
  {
    id: "s21",
    name: "Theo Bea Bonafe",
    number: 9,
    position: "S",
    team: "Akari",
    leagues: ["PVL"],
    description: "Transferred.",
    history: "UP • Akari",
    awards: "PVL Champion",
  },
  {
    id: "s22",
    name: "Marionne Alba",
    number: 19,
    position: "S",
    team: "Akari",
    leagues: ["PVL"],
    description: "Transferred.",
    history: "DLSU • Akari",
    awards: "UAAP Finals MVP",
  },
  {
    id: "s23",
    name: "Janice Tolentino",
    number: 3,
    position: "S",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "Young setter.",
    history: "UE • Farm Fresh",
    awards: "Farm Fresh Setter",
  },
  {
    id: "s24",
    name: "Fhen Emnas",
    number: 17,
    position: "S",
    team: "Galeries",
    leagues: ["PVL"],
    description: "Veteran.",
    history: "Adamson • Galeries",
    awards: "PVL Veteran",
  },
  {
    id: "s25",
    name: "Venice Puzon",
    number: 8,
    position: "S",
    team: "LPU",
    leagues: ["NCAA"],
    description: "LPU Captain.",
    history: "LPU (NCAA)",
    awards: "NCAA Best Setter",
  },
  {
    id: "s26",
    name: "Alohi Robins-Hardy",
    number: 3,
    position: "S",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "2025 PVL Draft Pick #3.",
    history: "Cignal • Farm Fresh",
    awards: "PSL Best Setter",
  },
  {
    id: "s27",
    name: "Tia Andaya",
    number: 7,
    position: "S",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "2025 PVL Draft Pick #7.",
    history: "CWU • Choco Mucho",
    awards: "NCAA Div II",
  },
  {
    id: "s28",
    name: "Julyana Tolentino",
    number: 13,
    position: "S",
    team: "Petro Gazz",
    leagues: ["PVL", "UAAP"],
    description: "2025 PVL Draft Pick #11.",
    history: "DLSU • Petro Gazz",
    awards: "UAAP Champion",
  },
  {
    id: "s29",
    name: "Jan Rose Bulak",
    number: 4,
    position: "S",
    team: "Tay Tung",
    leagues: ["SSL", "Provincial"],
    description: "SSL Best Setter.",
    history: "Bacolod Tay Tung",
    awards: "SSL Best Setter",
  },
  {
    id: "s30",
    name: "Jasmine Nabor",
    number: 4,
    position: "S",
    team: "Chery Tiggo",
    leagues: ["PVL"],
    description: "Lefty tall.",
    history: "NU • Chery Tiggo",
    awards: "PVL Best Setter",
  },
  {
    id: "s31",
    name: "Lai Bendong",
    number: 1,
    position: "S",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "Tactical.",
    history: "UE • Choco Mucho",
    awards: "UAAP Best Setter",
  },

  // --- UAAP S87 STARS (S) ---
  {
    id: "s32",
    name: "Camilla Lamina",
    number: 8,
    position: "S",
    team: "NU",
    leagues: ["UAAP"],
    description: "Fast hands.",
    history: "NU (S84-Present)",
    awards: "UAAP Best Setter",
  },
  {
    id: "s33",
    name: "Cassie Carballo",
    number: 14,
    position: "S",
    team: "UST",
    leagues: ["UAAP"],
    description: "Crafty.",
    history: "UST (S85-Present)",
    awards: "UAAP Best Setter",
  },
  {
    id: "s34",
    name: "Tin Ubaldo",
    number: 5,
    position: "S",
    team: "FEU",
    leagues: ["UAAP"],
    description: "Tall setter.",
    history: "FEU (S85-Present)",
    awards: "UAAP Bronze",
  },
  {
    id: "s35",
    name: "Takako Fujimoto",
    number: 1,
    position: "S",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Japanese-Filipino.",
    history: "Ateneo (S84-Present)",
    awards: "Ateneo Captain",
  },
  {
    id: "s36",
    name: "Felicity Sagaysay",
    number: 14,
    position: "S",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Rookie setter.",
    history: "Adamson (S87-Rookie)",
    awards: "UAAP Jrs Champion",
  },
  {
    id: "s37",
    name: "Kizzie Madriaga",
    number: 12,
    position: "S",
    team: "UE",
    leagues: ["UAAP"],
    description: "Young setter.",
    history: "UE (S86-Present)",
    awards: "UE Starter",
  },
  {
    id: "s38",
    name: "Julia De Leon",
    number: 17,
    position: "S",
    team: "UP",
    leagues: ["UAAP"],
    description: "Rookie setter.",
    history: "UP (S87-Rookie)",
    awards: "UPIS Captain",
  },
  {
    id: "s39",
    name: "Jaz Manguilimotan",
    number: 1,
    position: "S",
    team: "UP",
    leagues: ["UAAP"],
    description: "Rookie setter.",
    history: "UP (S87-Rookie)",
    awards: "SSL Standout",
  },
  {
    id: "s40",
    name: "Mikole Reyes",
    number: 10,
    position: "S",
    team: "DLSU",
    leagues: ["UAAP"],
    description: "DLSU backup.",
    history: "DLSU (S86-Present)",
    awards: "UAAP Champion",
  },
  {
    id: "s41",
    name: "Mary Ecalla",
    number: 3,
    position: "S",
    team: "UE",
    leagues: ["UAAP"],
    description: "UE reserve.",
    history: "UE (S86-Present)",
    awards: "UE Starter",
  },
  {
    id: "s42",
    name: "Lauritz Ginoo",
    number: 9,
    position: "S",
    team: "UE",
    leagues: ["UAAP"],
    description: "UE reserve.",
    history: "UE (S86-Present)",
    awards: "UE Starter",
  },
  {
    id: "s43",
    name: "Maria Sapienza",
    number: 9,
    position: "S",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Adamson setter.",
    history: "Adamson (S87-Present)",
    awards: "UAAP Jrs",
  },
  {
    id: "s44",
    name: "Katherine Cortez",
    number: 5,
    position: "S",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Ateneo setter.",
    history: "Ateneo (S87-Present)",
    awards: "Ateneo Starter",
  },
  {
    id: "s45",
    name: "Ela Raagas",
    number: 9,
    position: "S",
    team: "DLSU",
    leagues: ["UAAP"],
    description: "DLSU setter.",
    history: "DLSU (S87-Present)",
    awards: "DLSU Reserve",
  },
  {
    id: "s46",
    name: "Karyll Miranda",
    number: 11,
    position: "S",
    team: "FEU",
    leagues: ["UAAP"],
    description: "FEU setter.",
    history: "FEU (S87-Present)",
    awards: "FEU Reserve",
  },
  {
    id: "s47",
    name: "Abegail Pono",
    number: 3,
    position: "S",
    team: "NU",
    leagues: ["UAAP"],
    description: "NU backup.",
    history: "NU (S86-Present)",
    awards: "UAAP Champion",
  },
  {
    id: "s48",
    name: "Jaochen Cuenca",
    number: 7,
    position: "S",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "V-League Setter.",
    history: "Adamson (S87-Present)",
    awards: "",
  },
  {
    id: "s49",
    name: "Mary Anthoneth Cortes",
    number: 2,
    position: "S",
    team: "USJ-R",
    leagues: ["CESAFI", "SSL"],
    description: "Cebu Setter.",
    history: "USJ-R Lady Jaguars",
    awards: "CESAFI",
  },
  {
    id: "s50",
    name: "Freighanne Garcia",
    number: 6,
    position: "S",
    team: "Mapua",
    leagues: ["NCAA"],
    description: "Mapua Setter.",
    history: "Mapua (NCAA S100)",
    awards: "",
  },
  {
    id: "s51",
    name: "Mauie Magtangob",
    number: 5,
    position: "S",
    team: "Arellano",
    leagues: ["NCAA"],
    description: "Arellano Setter.",
    history: "Arellano (NCAA S100)",
    awards: "",
  },
  {
    id: "s52",
    name: "Anne Formento",
    number: 4,
    position: "S",
    team: "EAC",
    leagues: ["NCAA"],
    description: "EAC Setter.",
    history: "EAC (NCAA S100)",
    awards: "",
  },
  {
    id: "s53",
    name: "Jerry Lyn Laurente",
    number: 2,
    position: "S",
    team: "JRU",
    leagues: ["NCAA"],
    description: "JRU Setter.",
    history: "JRU (NCAA S100)",
    awards: "",
  },

  // ================= LIBEROS (L) =================
  // --- PVL PROS ---
  {
    id: "l1",
    name: "Dawn Macandili",
    number: 15,
    position: "L",
    team: "Cignal",
    leagues: ["PVL"],
    description: "Ms. Everywhere.",
    history: "DLSU • Cignal",
    awards: "PSL MVP",
  },
  {
    id: "l2",
    name: "Kath Arado",
    number: 28,
    position: "L",
    team: "PLDT",
    leagues: ["PVL"],
    description: "Technical master.",
    history: "UE • PLDT",
    awards: "UAAP Rookie of the Year",
  },
  {
    id: "l3",
    name: "Jen Nierva",
    number: 5,
    position: "L",
    team: "Chery Tiggo",
    leagues: ["PVL"],
    description: "Vocal leader.",
    history: "NU • Chery Tiggo",
    awards: "UAAP Best Libero",
  },
  {
    id: "l4",
    name: "Thang Ponce",
    number: 17,
    position: "L",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "The Digger.",
    history: "Adamson • Choco Mucho",
    awards: "PVL Best Libero",
  },
  {
    id: "l5",
    name: "Kyla Atienza",
    number: 11,
    position: "L",
    team: "Creamline",
    leagues: ["PVL"],
    description: "Solid efficiency.",
    history: "FEU • Creamline",
    awards: "PVL Finals MVP",
  },
  {
    id: "l6",
    name: "Alyssa Eroa",
    number: 10,
    position: "L",
    team: "ZUS Coffee",
    leagues: ["PVL"],
    description: "Fast and agile.",
    history: "San Beda • ZUS",
    awards: "NCAA Finals MVP",
  },
  {
    id: "l7",
    name: "Roma Mae Doromal",
    number: 14,
    position: "L",
    team: "Capital1",
    leagues: ["PVL"],
    description: "Steady receiver.",
    history: "Ateneo • Capital1",
    awards: "Ateneo Captain",
  },
  {
    id: "l8",
    name: "Denden Lazaro",
    number: 13,
    position: "L",
    team: "Creamline",
    leagues: ["PVL"],
    description: "Iron Eagle.",
    history: "Ateneo • Creamline",
    awards: "UAAP Best Receiver",
  },
  {
    id: "l9",
    name: "Bang Pineda",
    number: 19,
    position: "L",
    team: "Petro Gazz",
    leagues: ["PVL"],
    description: "Hard-nosed.",
    history: "Adamson • Petro Gazz",
    awards: "PSL Best Libero",
  },
  {
    id: "l10",
    name: "Justine Jazareno",
    number: 16,
    position: "L",
    team: "Akari",
    leagues: ["PVL"],
    description: "Acrobatic.",
    history: "DLSU • Akari",
    awards: "UAAP Champion",
  },
  {
    id: "l11",
    name: "Karen Verdeflor",
    number: 8,
    position: "L",
    team: "Chery Tiggo",
    leagues: ["PVL"],
    description: "Gritty.",
    history: "Adamson • Chery Tiggo",
    awards: "UAAP Bronze",
  },
  {
    id: "l12",
    name: "Dani Ravena",
    number: 1,
    position: "L",
    team: "Akari",
    leagues: ["PVL"],
    description: "Vocal.",
    history: "Ateneo • Akari",
    awards: "UAAP Champion",
  },
  {
    id: "l13",
    name: "Marian Tracy Andal",
    number: 21,
    position: "L",
    team: "Galeries",
    leagues: ["PVL"],
    description: "Top-tier.",
    history: "Perpetual • Galeries",
    awards: "NCAA Best Libero",
  },
  {
    id: "l14",
    name: "Janel Delerio",
    number: 6,
    position: "L",
    team: "Nxled",
    leagues: ["PVL"],
    description: "Transferred.",
    history: "UST • Nxled",
    awards: "UAAP Silver",
  },
  {
    id: "l15",
    name: "Buding Duremdes",
    number: 16,
    position: "L",
    team: "Chery Tiggo",
    leagues: ["PVL"],
    description: "Consistent.",
    history: "FEU • Chery Tiggo",
    awards: "PVL Champion",
  },
  {
    id: "l16",
    name: "Jellie Tempiatura",
    number: 6,
    position: "L",
    team: "Cignal",
    leagues: ["PVL"],
    description: "Digging.",
    history: "Adamson • Cignal",
    awards: "PSL Champion",
  },
  {
    id: "l17",
    name: "Max Juangco",
    number: 15,
    position: "L",
    team: "Akari",
    leagues: ["PVL"],
    description: "Young energy.",
    history: "FEU • Akari",
    awards: "UAAP Bronze",
  },
  {
    id: "l18",
    name: "Faye Flores",
    number: 12,
    position: "L",
    team: "Arellano",
    leagues: ["NCAA"],
    description: "NCAA ace.",
    history: "Arellano (NCAA)",
    awards: "NCAA Best Libero",
  },
  {
    id: "l19",
    name: "Bia General",
    number: 4,
    position: "L",
    team: "Cignal",
    leagues: ["PVL"],
    description: "Veteran.",
    history: "NU • Cignal",
    awards: "PSL Champion",
  },
  {
    id: "l20",
    name: "Justine Dorog",
    number: 13,
    position: "L",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "Converted.",
    history: "UP • Farm Fresh",
    awards: "UAAP ROY Nominee",
  },
  {
    id: "l21",
    name: "Melissa Gohing",
    number: 11,
    position: "L",
    team: "Creamline (Legend)",
    leagues: ["PVL"],
    description: "Legendary defense.",
    history: "DLSU • Creamline",
    awards: "5x UAAP Champion",
  },
  {
    id: "l22",
    name: "Stephanie de Chavez",
    number: 8,
    position: "L",
    team: "Univ Batangas",
    leagues: ["Provincial"],
    description: "UB Libero.",
    history: "University of Batangas",
    awards: "RVL Silver",
  },
  {
    id: "l23",
    name: "Ann Monares",
    number: 13,
    position: "L",
    team: "Farm Fresh",
    leagues: ["PVL"],
    description: "2025 PVL Draft Pick #16.",
    history: "FEU • Farm Fresh",
    awards: "",
  },
  {
    id: "l24",
    name: "Mary Kylene Villegas",
    number: 14,
    position: "L",
    team: "Choco Mucho",
    leagues: ["PVL"],
    description: "2025 PVL Draft Pick #19.",
    history: "Adamson • Choco Mucho",
    awards: "UAAP Jrs Champion",
  },
  {
    id: "l25",
    name: "Mary Rhose Dapol",
    number: 1,
    position: "L",
    team: "Chery Tiggo",
    leagues: ["PVL", "NCAA"],
    description: "NCAA MVP.",
    history: "Perpetual • Chery Tiggo",
    awards: "NCAA MVP",
  },
  {
    id: "l26",
    name: "Jayrelle Jhem Mesa",
    number: 6,
    position: "L",
    team: "Kings Mont",
    leagues: ["Provincial"],
    description: "SSL Libero.",
    history: "Kings Montessori",
    awards: "",
  },
  {
    id: "l27",
    name: "Judiel Nitura",
    number: 7,
    position: "L",
    team: "Letran",
    leagues: ["NCAA"],
    description: "Letran Libero.",
    history: "Letran (NCAA S100)",
    awards: "",
  },

  // --- UAAP S87 STARS (L) ---
  {
    id: "l28",
    name: "Detdet Pepito",
    number: 11,
    position: "L",
    team: "UST",
    leagues: ["UAAP"],
    description: "Mini Miss Everywhere.",
    history: "UST (S85-Present)",
    awards: "UAAP Best Libero",
  },
  {
    id: "l29",
    name: "Shaira Jardio",
    number: 7,
    position: "L",
    team: "NU",
    leagues: ["UAAP"],
    description: "Underrated.",
    history: "NU (S85-Present)",
    awards: "UAAP Champion",
  },
  {
    id: "l30",
    name: "Lyka De Leon",
    number: 6,
    position: "L",
    team: "DLSU",
    leagues: ["UAAP"],
    description: "Reliable.",
    history: "DLSU (S86-Present)",
    awards: "UAAP Bronze",
  },
  {
    id: "l31",
    name: "Jennifer Zeta",
    number: 8,
    position: "L",
    team: "UE",
    leagues: ["UAAP"],
    description: "Bright spot.",
    history: "UE (S85-Present)",
    awards: "UE Anchor",
  },
  {
    id: "l32",
    name: "Margarett Encarnacion",
    number: 17,
    position: "L",
    team: "FEU",
    leagues: ["UAAP"],
    description: "Tall libero.",
    history: "FEU (S86-Present)",
    awards: "UAAP Bronze",
  },
  {
    id: "l33",
    name: "Juris Manuel",
    number: 12,
    position: "L",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Rookie libero.",
    history: "Adamson (S87-Rookie)",
    awards: "UAAP Jrs Champion",
  },
  {
    id: "l34",
    name: "Giesha Capistrano",
    number: 2,
    position: "L",
    team: "UP",
    leagues: ["UAAP"],
    description: "Converted libero.",
    history: "UP (S87-Present)",
    awards: "Former Opposite",
  },
  {
    id: "l35",
    name: "Roma Ma. Silla",
    number: 19,
    position: "L",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Steady defense.",
    history: "Ateneo (S86-Present)",
    awards: "Ateneo Libero",
  },
  {
    id: "l36",
    name: "Francesca Rodriguez",
    number: 4,
    position: "L",
    team: "DLSU",
    leagues: ["UAAP"],
    description: "DLSU rookie libero.",
    history: "DLSU (S87-Rookie)",
    awards: "DLSU Rookie",
  },
  {
    id: "l37",
    name: "Angelica Reyes",
    number: 20,
    position: "L",
    team: "UE",
    leagues: ["UAAP"],
    description: "UE libero.",
    history: "UE (S85-Present)",
    awards: "UE Starter",
  },
  {
    id: "l38",
    name: "Althea Aposaga",
    number: 19,
    position: "L",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "Adamson libero.",
    history: "Adamson (S87-Present)",
    awards: "Adamson Reserve",
  },
  {
    id: "l39",
    name: "Julianne Monares",
    number: 20,
    position: "L",
    team: "FEU",
    leagues: ["UAAP"],
    description: "FEU libero.",
    history: "FEU (S87-Present)",
    awards: "FEU Reserve",
  },
  {
    id: "l40",
    name: "IC Cepada",
    number: 20,
    position: "L",
    team: "NU",
    leagues: ["UAAP"],
    description: "NU libero.",
    history: "NU (S86-Present)",
    awards: "UAAP Champion",
  },
  {
    id: "l41",
    name: "Fiona Arroyo",
    number: 19,
    position: "L",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Ateneo libero.",
    history: "Ateneo (S87-Present)",
    awards: "Ateneo Reserve",
  },
  {
    id: "l42",
    name: "Sarah Hugo",
    number: 22,
    position: "L",
    team: "Ateneo",
    leagues: ["UAAP"],
    description: "Ateneo libero.",
    history: "Ateneo (S87-Present)",
    awards: "Ateneo Reserve",
  },
  {
    id: "l43",
    name: "Sandrine Escober",
    number: 14,
    position: "L",
    team: "UST",
    leagues: ["UAAP"],
    description: "UST libero.",
    history: "UST (S86-Present)",
    awards: "UAAP Silver",
  },
  {
    id: "l44",
    name: "Alijah Ysulan",
    number: 3,
    position: "L",
    team: "UP",
    leagues: ["UAAP"],
    description: "UP libero.",
    history: "UP (S87-Present)",
    awards: "UP Starter",
  },
  {
    id: "l45",
    name: "Claire Jesselou Gam",
    number: 23,
    position: "L",
    team: "Adamson",
    leagues: ["UAAP"],
    description: "V-League Libero.",
    history: "Adamson (S87)",
    awards: "",
  },

  // ================= COACHING STAFF (COACH) =================
  // --- HEAD COACHES ---
  {
    id: "c1",
    name: "Ramil de Jesus",
    number: "HC",
    position: "COACH",
    team: "DLSU",
    description: "Legendary 12-time UAAP champion coach.",
    history: "DLSU Head Coach (1997-Present)",
    awards: "12x UAAP Champion • PSL Champion • Multiple Coach of the Year",
  },
  {
    id: "c2",
    name: "Sherwin Meneses",
    number: "HC",
    position: "COACH",
    team: "Creamline",
    description: "Multiple PVL champion coach.",
    history: "Creamline HC (2022-Present)",
    awards: "Multiple PVL Champion • PVL Coach of the Year",
  },
  {
    id: "c3",
    name: "Dante Alinsunurin",
    number: "HC",
    position: "COACH",
    team: "Choco Mucho",
    description: "Men's National Team success.",
    history: "Choco Mucho (2023-Present)",
    awards: "SEA Games Silver",
  },
  {
    id: "c4",
    name: "Jorge Souza de Brito",
    number: "HC",
    position: "COACH",
    team: "Alas Pilipinas",
    description: "Brazilian tactician.",
    history: "Alas Pilipinas (2021-Present)",
    awards: "AVC Bronze",
  },
  {
    id: "c5",
    name: "Shaq Delos Santos",
    number: "HC",
    position: "COACH",
    team: "Cignal",
    description: "Veteran coach.",
    history: "Cignal HC (2021-Present)",
    awards: "4x PSL Champion",
  },
  {
    id: "c6",
    name: "Koji Tsuzurabara",
    number: "HC",
    position: "COACH",
    team: "Petro Gazz",
    description: "Japanese system.",
    history: "Petro Gazz (2024-Present)",
    awards: "PVL Finalist",
  },
  {
    id: "c7",
    name: "Rald Ricafort",
    number: "HC",
    position: "COACH",
    team: "PLDT",
    description: "Young brilliant mind.",
    history: "PLDT (2023-Present)",
    awards: "PVL Champion",
  },
  {
    id: "c8",
    name: "Jerry Yee",
    number: "HC",
    position: "COACH",
    team: "ZUS / UE",
    description: "Program builder.",
    history: "UE HC (2022-) • ZUS HC (2024-)",
    awards: "NCAA Champion",
  },
  {
    id: "c9",
    name: "Norman Miguel",
    number: "HC",
    position: "COACH",
    team: "NU",
    description: "Championship coach.",
    history: "NU HC (2019-Present)",
    awards: "UAAP Champion",
  },
  {
    id: "c10",
    name: "Kungfu Reyes",
    number: "HC",
    position: "COACH",
    team: "Chery / UST",
    description: "Longtime UST mentor.",
    history: "UST HC (2016-Present)",
    awards: "UAAP Finalist",
  },
  {
    id: "c11",
    name: "Tina Salak",
    number: "HC",
    position: "COACH",
    team: "Akari",
    description: "Legendary setter.",
    history: "Akari HC (2025-)",
    awards: "UAAP Champion (Coach)",
  },
  {
    id: "c12",
    name: "Taka Minowa",
    number: "HC",
    position: "COACH",
    team: "Nxled",
    description: "Japanese system.",
    history: "Nxled (2023-)",
    awards: "V.League Tech Director",
  },
  {
    id: "c13",
    name: "Godfrey Okumu",
    number: "HC",
    position: "COACH",
    team: "Galeries",
    description: "International experience.",
    history: "Galeries (2023-Present)",
    awards: "PVL Semifinalist",
  },
  {
    id: "c14",
    name: "Roger Gorayeb",
    number: "HC",
    position: "COACH",
    team: "Capital1",
    description: "Grand Slam champion.",
    history: "Capital1 (2024-)",
    awards: "V-League Grand Slam",
  },
  {
    id: "c15",
    name: "Oliver Almadro",
    number: "HC",
    position: "COACH",
    team: "UP / Letran",
    description: "High energy.",
    history: "UP HC (2023-)",
    awards: "UAAP Champion",
  },
  {
    id: "c20",
    name: "Onyok Getigan",
    number: "HC",
    position: "COACH",
    team: "CSB",
    description: "NCAA Champion.",
    history: "CSB HC",
    awards: "3x NCAA Champion",
  },
  {
    id: "c23",
    name: "Sergio Veloso",
    number: "HC",
    position: "COACH",
    team: "Ateneo",
    description: "Brazilian coach.",
    history: "Ateneo HC (2023-)",
    awards: "PH Men's HC",
  },
  {
    id: "c24",
    name: "JP Yude",
    number: "HC",
    position: "COACH",
    team: "Adamson",
    description: "UAAP champion coach (Girls).",
    history: "Adamson Women's HC (2023-)",
    awards: "UAAP Jrs Champion",
  },
  {
    id: "c25",
    name: "Manolo Refugia",
    number: "HC",
    position: "COACH",
    team: "FEU",
    description: "Revitalized FEU.",
    history: "FEU HC (2023-)",
    awards: "UAAP Bronze",
  },
  {
    id: "c26",
    name: "Brian Esquibel",
    number: "HC",
    position: "COACH",
    team: "Petro Gazz",
    description: "Interim specialist.",
    history: "Petro Gazz Assistant",
    awards: "PVL Coaching Staff",
  },
  {
    id: "c27",
    name: "Alessandro Lodi",
    number: "HC",
    position: "COACH",
    team: "Farm Fresh",
    description: "Italian tactician.",
    history: "Farm Fresh HC (2025-)",
    awards: "European League Experience",
  },
  {
    id: "c38",
    name: "Sammy Acaylar",
    number: "HC",
    position: "COACH",
    team: "Perpetual",
    description: "NCAA Dynasty.",
    history: "Perpetual HC",
    awards: "Multiple NCAA Championships",
  },
  {
    id: "c39",
    name: "Obet Javier",
    number: "HC",
    position: "COACH",
    team: "Arellano",
    description: "Defensive mastermind.",
    history: "Arellano HC",
    awards: "Multiple NCAA Championships",
  },
  {
    id: "c42",
    name: "Allan Mendoza",
    number: "HC",
    position: "COACH",
    team: "UE",
    description: "UE Head Coach.",
    history: "UE HC (2024-Present)",
    awards: "UE Program",
  },
  {
    id: "c43",
    name: "Benson Bocboc",
    number: "HC",
    position: "COACH",
    team: "UP",
    description: "UP Head Coach.",
    history: "UP HC (2024-Present)",
    awards: "UP Program",
  },
  {
    id: "c44",
    name: "Emilio Reyes Jr.",
    number: "HC",
    position: "COACH",
    team: "UST",
    description: "UST Head Coach.",
    history: "UST HC (2024-Present)",
    awards: "UST Program",
  },
  {
    id: "c45",
    name: "Carlo Cabatingan",
    number: "HC",
    position: "COACH",
    team: "UP",
    description: "UP Men's Head Coach.",
    history: "UP Men's HC (2024-Present)",
    awards: "UP Program",
  },
  {
    id: "c46",
    name: "Jose Roque",
    number: "HC",
    position: "COACH",
    team: "DLSU",
    description: "DLSU Men's Head Coach.",
    history: "DLSU Men's HC (2024-Present)",
    awards: "UAAP Men's Champion",
  },
  {
    id: "c47",
    name: "Eddieson Orcullo",
    number: "HC",
    position: "COACH",
    team: "FEU",
    description: "FEU Men's Head Coach.",
    history: "FEU Men's HC (2024-Present)",
    awards: "UAAP Men's Bronze",
  },
  {
    id: "c48",
    name: "Arthur Alan Mamon",
    number: "HC",
    position: "COACH",
    team: "UST",
    description: "UST Men's Head Coach.",
    history: "UST Men's HC (2024-Present)",
    awards: "UAAP Men's Silver",
  },
  {
    id: "c49",
    name: "Jerome Guhit",
    number: "HC",
    position: "COACH",
    team: "UE",
    description: "UE Men's Head Coach.",
    history: "UE Men's HC (2024-Present)",
    awards: "UE Program",
  },
  {
    id: "c50",
    name: "Raffy Mosuela",
    number: "HC",
    position: "COACH",
    team: "Adamson",
    description: "Adamson Men's Head Coach.",
    history: "Adamson Men's HC (2024-Present)",
    awards: "Adamson Program",
  },
  {
    id: "c51",
    name: "Vince Mangulabnan",
    number: "HC",
    position: "COACH",
    team: "Ateneo",
    description: "Ateneo Men's Head Coach.",
    history: "Ateneo Men's HC (2024-Present)",
    awards: "Ateneo Program",
  },

  // --- ASSISTANT COACHES (AC) ---
  {
    id: "c16",
    name: "Noel Orcullo",
    number: "AC",
    position: "COACH",
    team: "DLSU",
    description: "Reliable assistant.",
    history: "DLSU Assistant",
    awards: "Multiple UAAP Championships",
  },
  {
    id: "c17",
    name: "Mosuela",
    number: "AC",
    position: "COACH",
    team: "Akari",
    description: "Veteran tactician.",
    history: "Akari Assistant",
    awards: "PVL Finalist",
  },
  {
    id: "c18",
    name: "Reg Macnayon",
    number: "AC",
    position: "COACH",
    team: "Farm Fresh",
    description: "Player development.",
    history: "Farm Fresh Assistant",
    awards: "NCAA Champion (Assistant)",
  },
  {
    id: "c19",
    name: "Karlo Santos",
    number: "AC",
    position: "COACH",
    team: "Creamline",
    description: "Championship staff.",
    history: "Creamline Assistant",
    awards: "Multiple PVL Titles",
  },
  {
    id: "c21",
    name: "Lerma Giron",
    number: "AC",
    position: "COACH",
    team: "Galeries",
    description: "Technical assistant.",
    history: "Galeries Assistant",
    awards: "PVL Head Coach Experience",
  },
  {
    id: "c22",
    name: "Vilet Ponce-De Leon",
    number: "AC",
    position: "COACH",
    team: "UST",
    description: "Jrs Champion coach.",
    history: "UST Women's Assistant",
    awards: "UAAP Jrs Champion",
  },
  {
    id: "c29",
    name: "Clint Malazo",
    number: "AC",
    position: "COACH",
    team: "PLDT",
    description: "Strength focus.",
    history: "PLDT Assistant",
    awards: "Spikers' Turf Champion",
  },
  {
    id: "c30",
    name: "Emilio Reyes",
    number: "AC",
    position: "COACH",
    team: "Army",
    description: "Veteran assistant.",
    history: "Army HC",
    awards: "PVL/PSL Champion",
  },
  {
    id: "c31",
    name: "Alohi Robins-Hardy",
    number: "AC",
    position: "COACH",
    team: "UP",
    description: "Former PSL star turned coach.",
    history: "UP Asst Coach (2025-)",
    awards: "PSL Best Setter",
  },
  {
    id: "c32",
    name: "Edjet Mabbayad",
    number: "AC",
    position: "COACH",
    team: "Choco Mucho",
    description: "Veteran UAAP champion coach.",
    history: "FEU Men's HC • Choco Mucho Asst (2023-)",
    awards: "UAAP Men's Champion",
  },
  {
    id: "c33",
    name: "Jessie Lopez",
    number: "AC",
    position: "COACH",
    team: "Choco Mucho",
    description: "Former Air Force setter.",
    history: "Air Force (Player) • Choco Mucho Asst",
    awards: "Spikers' Turf Champion",
  },
  {
    id: "c34",
    name: "Franz Damian",
    number: "AC",
    position: "COACH",
    team: "Galeries",
    description: "Technical assistant.",
    history: "Galeries Asst (2024-)",
    awards: "PVL Coaching Staff",
  },
  {
    id: "c35",
    name: "Doc Ian Laurel",
    number: "AC",
    position: "COACH",
    team: "UST",
    description: "Longtime UST staff.",
    history: "UST Asst",
    awards: "UAAP Coaching Staff",
  },
  {
    id: "c36",
    name: "Vince Mangulabnan",
    number: "AC",
    position: "COACH",
    team: "Akari",
    description: "Former NU setter.",
    history: "NU (Player) • Akari Asst",
    awards: "UAAP Men's Champion",
  },
  {
    id: "c37",
    name: "Rogelio Getigan",
    number: "AC",
    position: "COACH",
    team: "ZUS",
    description: "CSB Champion coach.",
    history: "CSB HC • ZUS Asst",
    awards: "NCAA Champion",
  },
  {
    id: "c40",
    name: "Christian Fernandez",
    number: "AC",
    position: "COACH",
    team: "UST",
    description: "UST Assistant.",
    history: "UST WVT",
    awards: "UAAP Finalist",
  },
  {
    id: "c41",
    name: "Arnold Laniog",
    number: "AC",
    position: "COACH",
    team: "PLDT",
    description: "Men's Champion coach.",
    history: "CSB Men's HC • PLDT Asst",
    awards: "NCAA Men's Champion",
  },
];

const ROSTER_LIMITS = { OH: 4, OP: 2, MB: 4, S: 2, L: 2, COACH: 6 };
const TEAM_LIMIT = 20;

const PlayerCard = ({
  player,
  isSelected,
  togglePlayer,
  isStarter,
  toggleStarter,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const isCoach = player.position === "COACH";

  return (
    <div
      className={`relative group bg-white rounded-xl p-4 border transition-all duration-200 hover:shadow-lg ${
        isSelected
          ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
          : "border-slate-200 hover:border-indigo-300"
      }`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded text-white shadow-sm ${
                player.position === "L"
                  ? "bg-yellow-500"
                  : player.position === "S"
                  ? "bg-purple-500"
                  : player.position === "MB"
                  ? "bg-emerald-500"
                  : player.position === "OP"
                  ? "bg-red-500"
                  : player.position === "COACH"
                  ? "bg-slate-800"
                  : "bg-blue-500"
              }`}
            >
              {player.number === "HC"
                ? "HEAD COACH"
                : player.number === "AC"
                ? "ASST COACH"
                : player.position}
            </span>
            {!isCoach && (
              <span className="text-xs font-semibold text-slate-400">
                #{player.number}
              </span>
            )}
          </div>
          <h3 className="font-bold text-lg text-slate-800 leading-tight">
            {player.name}
          </h3>
          <p className="text-sm text-indigo-600 font-semibold mb-1">
            {player.team}
          </p>
          <p className="text-xs text-slate-500 italic leading-snug">
            {player.description}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
            className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 mt-3 hover:underline focus:outline-none transition-colors"
          >
            {showDetails ? "Hide Profile" : "Show Full Profile"}
            {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          {showDetails && (
            <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
              {player.history && (
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase mb-1">
                    <History className="w-3 h-3" /> Career History
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    {player.history}
                  </p>
                </div>
              )}

              {player.awards && (
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold uppercase mb-1">
                    <Trophy className="w-3 h-3" /> Citations
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    {player.awards}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => togglePlayer(player)}
            className={`p-2.5 rounded-full transition-all shadow-sm ${
              isSelected
                ? "bg-red-100 text-red-600 hover:bg-red-200 rotate-90"
                : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:scale-110"
            }`}
          >
            {isSelected ? (
              <X className="w-5 h-5" />
            ) : (
              <UserPlus className="w-5 h-5" />
            )}
          </button>

          {isSelected && !isCoach && (
            <button
              onClick={() => toggleStarter(player)}
              className={`p-2.5 rounded-full transition-all shadow-sm ${
                isStarter
                  ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                  : "bg-slate-100 text-slate-400 hover:bg-slate-200"
              }`}
              title={
                isStarter ? "Remove from Starting Six" : "Add to Starting Six"
              }
            >
              <Star className={`w-5 h-5 ${isStarter ? "fill-current" : ""}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [team, setTeam] = useState([]);
  const [starters, setStarters] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const teamCount = team.length;

  const counts = useMemo(() => {
    return team.reduce(
      (acc, p) => {
        if (p.position === "COACH") {
          if (p.number === "HC") acc.HC = (acc.HC || 0) + 1;
          else acc.AC = (acc.AC || 0) + 1;
        } else {
          acc[p.position] = (acc[p.position] || 0) + 1;
        }
        return acc;
      },
      { OH: 0, OP: 0, MB: 0, S: 0, L: 0, HC: 0, AC: 0 }
    );
  }, [team]);

  // Calculate coaches dynamically
  const coaches = team.filter((p) => p.position === "COACH");
  const headCoach = coaches.length > 0 ? coaches[0] : null;
  const assistantCoaches = coaches.length > 1 ? coaches.slice(1) : [];

  const starterCounts = useMemo(() => {
    return starters.reduce(
      (acc, id) => {
        const player = team.find((p) => p.id === id);
        if (player) {
          acc[player.position] = (acc[player.position] || 0) + 1;
        }
        return acc;
      },
      { OH: 0, OP: 0, MB: 0, S: 0, L: 0 }
    );
  }, [starters, team]);

  const uniqueTeams = useMemo(() => {
    const allTeams = new Set();
    ALL_PLAYERS.forEach((p) => {
      if (p.team) {
        p.team.split("/").forEach((t) => allTeams.add(t.trim()));
      }
      if (p.leagues) {
        p.leagues.forEach((l) => allTeams.add(l));
      }
    });
    return [...allTeams].sort();
  }, []);

  const togglePlayer = (player) => {
    const isSelected = team.find((p) => p.id === player.id);
    if (isSelected) {
      setTeam(team.filter((p) => p.id !== player.id));
      setStarters(starters.filter((id) => id !== player.id));
    } else {
      if (teamCount >= TEAM_LIMIT) {
        alert(`Roster full! Max ${TEAM_LIMIT} members.`);
        return;
      }

      // Role limits check (Players only)
      if (player.position !== "COACH") {
        if (counts[player.position] >= ROSTER_LIMITS[player.position]) {
          alert(
            `You already have ${ROSTER_LIMITS[player.position]} ${
              player.position
            }s.`
          );
          return;
        }
      }

      setTeam([...team, player]);
    }
  };

  const toggleStarter = (player) => {
    if (starters.includes(player.id)) {
      setStarters(starters.filter((id) => id !== player.id));
    } else {
      const limits = { OH: 2, MB: 2, OP: 1, S: 1, L: 1 };

      if (starterCounts[player.position] >= limits[player.position]) {
        alert(
          `You already have ${limits[player.position]} starting ${
            player.position
          }(s). Unstar one to add this player.`
        );
        return;
      }
      setStarters([...starters, player.id]);
    }
  };

  const filteredPlayers = ALL_PLAYERS.filter((player) => {
    const matchesPosition = filter === "ALL" || player.position === filter;

    // Fixed logic: search in team name OR in leagues array. If teamFilter is 'ALL' or empty, show everything.
    const matchesTeam =
      teamFilter === "ALL" ||
      teamFilter === "" ||
      player.team.includes(teamFilter) ||
      (player.leagues && player.leagues.includes(teamFilter)) ||
      player.team.toLowerCase().includes(teamFilter.toLowerCase());

    const matchesSearch =
      searchTerm === "" ||
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesPosition && matchesTeam && matchesSearch;
  });

  const filteredTeamsList = uniqueTeams.filter(
    (t) =>
      (teamFilter === "ALL" ||
        teamFilter === "" ||
        t.toLowerCase().includes(teamFilter.toLowerCase())) &&
      t !== "ALL"
  );

  // Helper to get the specific player for a starting slot
  const getStarterForSlot = (pos, index = 0) => {
    // Filter all players in my team that match this position AND are in the starters list
    const positionStarters = team.filter(
      (p) => p.position === pos && starters.includes(p.id)
    );
    return positionStarters[index] || null;
  };

  const generateExportText = () => {
    let text = "🇵🇭 MY FANTASY VOLLEYBALL TEAM (2025 Edition) 🇵🇭\n\n";

    if (headCoach) {
      text += `[HEAD COACH]:\n- ${headCoach.name} (${headCoach.team})\n\n`;
    }

    if (assistantCoaches.length > 0) {
      text += `[ASSISTANT COACHES]:\n`;
      assistantCoaches.forEach((c) => (text += `- ${c.name} (${c.team})\n`));
      text += "\n";
    }

    text += `[ROSTER]:\n`;
    ["OH", "OP", "MB", "S", "L"].forEach((pos) => {
      const players = team.filter((p) => p.position === pos);
      if (players.length > 0) {
        text += `\n${pos}:\n`;
        players.forEach((p) => {
          const isStart = starters.includes(p.id) ? "[STARTER] " : "";
          text += `- ${isStart}${p.name} (${p.team})\n`;
        });
      }
    });
    return text;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Fantasy Volley PH 2025
              </h1>
              <p className="text-xs text-blue-200">
                PVL & UAAP S87 Roster Builder
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md px-6 py-2 rounded-xl border border-white/20">
            <div className="text-center">
              <span className="block text-[10px] uppercase text-blue-200 font-bold tracking-wider">
                Roster
              </span>
              <span
                className={`text-xl font-bold ${
                  teamCount === TEAM_LIMIT ? "text-green-400" : "text-white"
                }`}
              >
                {teamCount}/{TEAM_LIMIT}
              </span>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="flex gap-3 text-[10px] font-medium overflow-x-auto">
              {["OH", "OP", "MB", "S", "L"].map((pos) => (
                <div
                  key={pos}
                  className={`flex flex-col items-center ${
                    counts[pos] === ROSTER_LIMITS[pos]
                      ? "text-green-400"
                      : "text-white"
                  }`}
                >
                  <span>{pos}</span>
                  <span>
                    {counts[pos]}/{ROSTER_LIMITS[pos]}
                  </span>
                </div>
              ))}
              <div className="flex flex-col items-center">
                <span>COACH</span>
                <span>{coaches.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
        {/* LEFT COLUMN: PLAYER POOL */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 sticky top-24 z-40">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search player or coach name..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all hover:border-slate-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Custom Combobox for Team Filter */}
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Filter by Team..."
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all hover:border-slate-400"
                    value={teamFilter === "ALL" ? "" : teamFilter}
                    onChange={(e) => {
                      setTeamFilter(e.target.value);
                      setIsTeamDropdownOpen(true);
                    }}
                    onFocus={() => setIsTeamDropdownOpen(true)}
                    onBlur={() =>
                      setTimeout(() => setIsTeamDropdownOpen(false), 200)
                    }
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                  >
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>

                  {isTeamDropdownOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto z-50">
                      <div
                        className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-600 font-medium border-b border-slate-100"
                        onClick={() => {
                          setTeamFilter("ALL");
                          setIsTeamDropdownOpen(false);
                        }}
                      >
                        Show All Teams
                      </div>
                      {filteredTeamsList.length > 0 ? (
                        filteredTeamsList.map((team) => (
                          <div
                            key={team}
                            className="px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer text-sm text-slate-700 transition-colors flex justify-between items-center group"
                            onClick={() => {
                              setTeamFilter(team);
                              setIsTeamDropdownOpen(false);
                            }}
                          >
                            <span>{team}</span>
                            {teamFilter === team && (
                              <Check className="w-3 h-3 text-indigo-600" />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-xs text-slate-400 text-center">
                          No teams match "{teamFilter}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {["ALL", "OH", "OP", "MB", "S", "L", "COACH"].map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setFilter(pos)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap shadow-sm border ${
                      filter === pos
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-md scale-105"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isSelected={!!team.find((p) => p.id === player.id)}
                togglePlayer={togglePlayer}
                isStarter={starters.includes(player.id)}
                toggleStarter={toggleStarter}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: MY TEAM */}
        <div className="lg:col-span-4 space-y-4">
          {/* STARTING LINEUP VISUALIZER */}
          <div className="bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden sticky top-24 z-30">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-3 flex items-center gap-2 text-white shadow-sm">
              <Zap className="w-5 h-5 text-yellow-300 fill-current" />
              <h2 className="font-bold text-sm tracking-wide">STARTING VII</h2>
            </div>

            <div className="p-3 bg-slate-50/50">
              <div className="grid grid-cols-3 gap-2 mb-2">
                {/* Front Row */}
                {["OH", "MB", "OP"].map((pos, i) => {
                  const starter = getStarterForSlot(pos, 0);
                  return (
                    <div
                      key={`front-${pos}`}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border ${
                        starter
                          ? "bg-white border-indigo-200 shadow-sm"
                          : "bg-slate-100 border-dashed border-slate-300"
                      } h-20 transition-all`}
                    >
                      <span className="text-[10px] font-bold text-indigo-400 uppercase mb-1">
                        {pos}
                      </span>
                      {starter ? (
                        <div className="text-center">
                          <div className="font-bold text-xs text-slate-800 leading-tight">
                            {starter.name}
                          </div>
                          <div className="text-[9px] text-slate-500">
                            {starter.team}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Empty
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {/* Back Row + Libero */}
                {["S", "L", "OH", "MB"].map((pos, i) => {
                  // For OH and MB, we need index 1 (since index 0 is in front row)
                  // For S and L, we need index 0
                  const idx = pos === "OH" || pos === "MB" ? 1 : 0;
                  const starter = getStarterForSlot(pos, idx);

                  return (
                    <div
                      key={`back-${pos}`}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border ${
                        starter
                          ? "bg-white border-indigo-200 shadow-sm"
                          : "bg-slate-100 border-dashed border-slate-300"
                      } h-20 transition-all`}
                    >
                      <span className="text-[10px] font-bold text-indigo-400 uppercase mb-1">
                        {pos === "L" ? "LIB" : pos}
                      </span>
                      {starter ? (
                        <div className="text-center">
                          <div className="font-bold text-[10px] text-slate-800 leading-tight">
                            {starter.name}
                          </div>
                          <div className="text-[8px] text-slate-500 truncate w-full">
                            {starter.team}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Empty
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coaching Staff Compact View */}
            <div className="bg-white border-t border-indigo-50 p-3">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardList className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Bench Bosses
                </span>
              </div>
              {headCoach ? (
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      {headCoach.name}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      HEAD COACH • {headCoach.team}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-center py-2 text-slate-400 italic border border-dashed border-slate-200 rounded">
                  No Head Coach Selected
                </div>
              )}

              {assistantCoaches.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {assistantCoaches.map((ac) => (
                    <span
                      key={ac.id}
                      className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded border border-slate-200"
                    >
                      {ac.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Full Roster List (Below the Visualizer) */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mt-4">
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-600 uppercase">
                Full Roster ({team.length})
              </span>
              <button
                onClick={() => setShowExport(true)}
                disabled={teamCount === 0}
                className="text-[10px] bg-white border border-slate-300 hover:bg-slate-50 px-2 py-1 rounded font-medium flex items-center gap-1 transition-colors shadow-sm"
              >
                <Share2 className="w-3 h-3" /> Export List
              </button>
            </div>

            <div className="p-2 space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
              {team.length > 0 ? (
                team.map((player) => {
                  const isStart = starters.includes(player.id);
                  const isCoach = player.position === "COACH";
                  return (
                    <div
                      key={player.id}
                      className={`flex justify-between items-center p-2 rounded-md border text-xs ${
                        isStart
                          ? "bg-yellow-50 border-yellow-200"
                          : "bg-white border-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {!isCoach && (
                          <button
                            onClick={() => toggleStarter(player)}
                            className={`p-1 rounded hover:bg-black/5 ${
                              isStart ? "text-yellow-500" : "text-slate-300"
                            }`}
                          >
                            <Star
                              className={`w-3 h-3 ${
                                isStart ? "fill-current" : ""
                              }`}
                            />
                          </button>
                        )}
                        <div>
                          <div className="font-bold text-slate-700">
                            {player.name}
                          </div>
                          <div className="text-[9px] text-slate-400">
                            {player.position} • {player.team}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => togglePlayer(player)}
                        className="text-slate-300 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 italic">
                  No players drafted yet.
                </div>
              )}
            </div>
            <div className="p-2 bg-slate-50 border-t border-slate-200 text-center">
              <button
                onClick={() => {
                  setTeam([]);
                  setStarters([]);
                }}
                className="text-[10px] text-red-500 hover:text-red-600 font-medium hover:underline"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </main>

      {showExport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all scale-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
              <Share2 className="w-6 h-6 text-indigo-600" /> Share Squad
            </h3>
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs whitespace-pre-wrap mb-6 max-h-64 overflow-y-auto border border-slate-200 text-slate-700">
              {generateExportText()}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateExportText());
                  alert("Copied to clipboard!");
                }}
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setShowExport(false)}
                className="flex-1 bg-white text-slate-700 border border-slate-200 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
