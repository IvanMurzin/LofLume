import type { Locale } from './i18n.ts';

// Original short summaries, checked against the linked primary sources on 2026-10-28.
// Add a stable id, a translation for every supported locale, and a source URL.
type Fact = { id: string; text: Record<Locale, string>; source: string };
export const platypusFacts = [
  {
    "id": "p-01",
    "text": {
      "ru": "Утконосы и ехидны — единственные современные млекопитающие, которые откладывают яйца.",
      "en": "Platypuses and echidnas are the only living mammals that lay eggs."
    },
    "source": "https://animals.sandiegozoo.org/animals/platypus"
  },
  {
    "id": "p-02",
    "text": {
      "ru": "Утконосы выкармливают детёнышей молоком, которое выделяется прямо через участки кожи.",
      "en": "Platypuses feed their young milk released through patches of skin."
    },
    "source": "https://animals.sandiegozoo.org/animals/platypus"
  },
  {
    "id": "p-03",
    "text": {
      "ru": "В клюве утконоса тысячи рецепторов, помогающих находить добычу в мутной воде.",
      "en": "Thousands of receptors in a platypus’s bill help it find prey in murky water."
    },
    "source": "https://animals.sandiegozoo.org/animals/platypus"
  },
  {
    "id": "p-04",
    "text": {
      "ru": "У взрослых самцов утконоса есть ядовитые шпоры.",
      "en": "Adult male platypuses have venomous spurs."
    },
    "source": "https://animals.sandiegozoo.org/animals/platypus"
  },
  {
    "id": "p-05",
    "text": {
      "ru": "В природе утконосы живут на востоке и юге Австралии, в том числе на Тасмании.",
      "en": "Wild platypuses live in eastern and southern Australia, including Tasmania."
    },
    "source": "https://animals.sandiegozoo.org/animals/platypus"
  },
  {
    "id": "p-06",
    "text": {
      "ru": "Утконосы чаще всего активны в сумерках и ночью.",
      "en": "Platypuses are usually most active at dusk and at night."
    },
    "source": "https://animals.sandiegozoo.org/animals/platypus"
  },
  {
    "id": "p-07",
    "text": {
      "ru": "Название «утконос» по-английски, platypus, происходит от греческого «плоская стопа».",
      "en": "The name “platypus” comes from Greek words meaning “flat foot.”"
    },
    "source": "https://animals.sandiegozoo.org/animals/platypus"
  },
  {
    "id": "p-08",
    "text": {
      "ru": "Только что вылупившийся утконос — около 2,5 сантиметра длиной.",
      "en": "A newly hatched platypus is only about 2.5 centimetres long."
    },
    "source": "https://animals.sandiegozoo.org/animals/platypus"
  },
  {
    "id": "g-01",
    "text": {
      "ru": "В шее жирафа семь позвонков — столько же, сколько у человека.",
      "en": "A giraffe has seven neck vertebrae, just like a human."
    },
    "source": "https://animals.sandiegozoo.org/animals/giraffe"
  },
  {
    "id": "g-02",
    "text": {
      "ru": "Рисунок пятен у каждого жирафа индивидуален, как отпечатки пальцев.",
      "en": "Every giraffe has its own spot pattern, like a fingerprint."
    },
    "source": "https://animals.sandiegozoo.org/animals/giraffe"
  },
  {
    "id": "g-03",
    "text": {
      "ru": "Ближайший родственник жирафа — окапи.",
      "en": "The giraffe’s closest relative is the okapi."
    },
    "source": "https://animals.sandiegozoo.org/animals/giraffe"
  },
  {
    "id": "g-04",
    "text": {
      "ru": "Один шейный позвонок жирафа может быть длиннее 25 сантиметров.",
      "en": "A single giraffe neck vertebra can be over 25 centimetres long."
    },
    "source": "https://animals.sandiegozoo.org/animals/giraffe"
  },
  {
    "id": "g-05",
    "text": {
      "ru": "И самцы, и самки жирафов носят покрытые кожей и шерстью рожки — оссиконы.",
      "en": "Both male and female giraffes have skin- and hair-covered horns called ossicones."
    },
    "source": "https://animals.sandiegozoo.org/animals/giraffe"
  },
  {
    "id": "g-06",
    "text": {
      "ru": "При обычной ходьбе жираф выносит вперёд обе ноги одной стороны, затем другой.",
      "en": "When walking, a giraffe moves both legs on one side forward, then both on the other."
    },
    "source": "https://animals.sandiegozoo.org/animals/giraffe"
  },
  {
    "id": "c-01",
    "text": {
      "ru": "Кораллы — животные, хотя внешне могут напоминать растения или камни.",
      "en": "Corals are animals, even when they look like plants or rocks."
    },
    "source": "https://oceanservice.noaa.gov/facts/coral.html"
  },
  {
    "id": "c-02",
    "text": {
      "ru": "Многие кораллы — колонии из сотен или тысяч крошечных полипов.",
      "en": "Many corals are colonies of hundreds or thousands of tiny polyps."
    },
    "source": "https://oceanservice.noaa.gov/facts/coral.html"
  },
  {
    "id": "c-03",
    "text": {
      "ru": "В тканях большинства кораллов живут микроскопические водоросли-партнёры.",
      "en": "Most corals host microscopic algae inside their tissues."
    },
    "source": "https://oceanservice.noaa.gov/facts/coral.html"
  },
  {
    "id": "c-04",
    "text": {
      "ru": "Коралловые полипы ловят пищу из воды маленькими щупальцами.",
      "en": "Coral polyps use tiny tentacles to catch food from the water."
    },
    "source": "https://oceanservice.noaa.gov/facts/coral.html"
  },
  {
    "id": "c-05",
    "text": {
      "ru": "Обесцвеченный коралл не обязательно мёртв: он ещё может пережить потерю водорослей.",
      "en": "A bleached coral is not necessarily dead: it can survive losing its algae."
    },
    "source": "https://oceanservice.noaa.gov/facts/coral.html"
  },
  {
    "id": "s-01",
    "text": {
      "ru": "У морских коньков потомство вынашивает и рождает самец.",
      "en": "Male seahorses carry the pregnancy and give birth."
    },
    "source": "https://oceanservice.noaa.gov/facts/seahorse.html"
  },
  {
    "id": "s-02",
    "text": {
      "ru": "Морские коньки умеют менять окраску, чтобы сливаться с окружением.",
      "en": "Seahorses can change colour to blend into their surroundings."
    },
    "source": "https://oceanservice.noaa.gov/facts/seahorse.html"
  },
  {
    "id": "b-01",
    "text": {
      "ru": "Летучие мыши — единственные млекопитающие, способные к настоящему машущему полёту.",
      "en": "Bats are the only mammals capable of true powered flight."
    },
    "source": "https://home.nps.gov/subjects/bats/how-bats-fly.htm"
  },
  {
    "id": "b-02",
    "text": {
      "ru": "Крыло летучей мыши — видоизменённая кисть с кожной перепонкой между длинными пальцами.",
      "en": "A bat’s wing is a modified hand, with skin stretched between long fingers."
    },
    "source": "https://home.nps.gov/subjects/bats/how-bats-fly.htm"
  },
  {
    "id": "b-03",
    "text": {
      "ru": "Научное название рукокрылых, Chiroptera, буквально означает «рука-крыло».",
      "en": "The scientific name Chiroptera literally means “hand wing.”"
    },
    "source": "https://home.nps.gov/subjects/bats/how-bats-fly.htm"
  },
  {
    "id": "b-04",
    "text": {
      "ru": "Летяги планируют, а летучие мыши активно машут крыльями.",
      "en": "Flying squirrels glide; bats actively flap their wings."
    },
    "source": "https://home.nps.gov/subjects/bats/how-bats-fly.htm"
  },
  {
    "id": "o-01",
    "text": {
      "ru": "У осьминога три сердца: два направляют кровь к жабрам, третье — к остальному телу.",
      "en": "An octopus has three hearts: two supply the gills, and one supplies the rest of the body."
    },
    "source": "https://www.nwf.org/Home/Educational-Resources/Wildlife-Guide/Invertebrates/Octopuses"
  },
  {
    "id": "o-02",
    "text": {
      "ru": "Кровь осьминога голубая: переносить кислород ей помогает соединение меди.",
      "en": "Octopus blood is blue because its oxygen-carrying molecule contains copper."
    },
    "source": "https://www.nwf.org/Home/Educational-Resources/Wildlife-Guide/Invertebrates/Octopuses"
  },
  {
    "id": "o-03",
    "text": {
      "ru": "Присоски осьминога чувствуют не только прикосновения, но и вкус.",
      "en": "Octopus suckers can sense both touch and taste."
    },
    "source": "https://www.nwf.org/Home/Educational-Resources/Wildlife-Guide/Invertebrates/Octopuses"
  },
  {
    "id": "o-04",
    "text": {
      "ru": "У осьминога есть твёрдый клюв, которым он прокусывает панцири добычи.",
      "en": "An octopus has a hard beak that can pierce its prey’s shells."
    },
    "source": "https://www.nwf.org/Home/Educational-Resources/Wildlife-Guide/Invertebrates/Octopuses"
  },
  {
    "id": "v-01",
    "text": {
      "ru": "Самая горячая планета Солнечной системы — Венера, хотя Меркурий ближе к Солнцу.",
      "en": "Venus is the hottest planet in our solar system, even though Mercury is closer to the Sun."
    },
    "source": "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    "id": "v-02",
    "text": {
      "ru": "Венера вращается в противоположную сторону по сравнению с большинством планет.",
      "en": "Venus spins in the opposite direction to most planets."
    },
    "source": "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    "id": "v-03",
    "text": {
      "ru": "На поверхности Венеры достаточно жарко, чтобы расплавить свинец.",
      "en": "The surface of Venus is hot enough to melt lead."
    },
    "source": "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    "id": "v-04",
    "text": {
      "ru": "Давление на поверхности Венеры примерно в 93 раза выше земного на уровне моря.",
      "en": "Surface pressure on Venus is about 93 times Earth’s sea-level pressure."
    },
    "source": "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    "id": "v-05",
    "text": {
      "ru": "По размеру и строению Венера похожа на Землю — поэтому их называют близнецами.",
      "en": "Venus is similar to Earth in size and structure, which is why they are called twins."
    },
    "source": "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    "id": "m-01",
    "text": {
      "ru": "Марс красный из-за окислившихся минералов железа — по сути, ржавчины.",
      "en": "Mars looks red because its iron minerals have oxidised — essentially, rusted."
    },
    "source": "https://science.nasa.gov/mars/facts/"
  },
  {
    "id": "m-02",
    "text": {
      "ru": "Марсианские сутки называют солом; они длятся около 24,6 часа.",
      "en": "A Martian day is called a sol and lasts about 24.6 hours."
    },
    "source": "https://science.nasa.gov/mars/facts/"
  },
  {
    "id": "m-03",
    "text": {
      "ru": "Год на Марсе длится примерно 687 земных суток.",
      "en": "A year on Mars lasts about 687 Earth days."
    },
    "source": "https://science.nasa.gov/mars/facts/"
  },
  {
    "id": "m-04",
    "text": {
      "ru": "Диаметр Марса примерно вдвое меньше диаметра Земли.",
      "en": "Mars is roughly half as wide as Earth."
    },
    "source": "https://science.nasa.gov/mars/facts/"
  },
  {
    "id": "m-05",
    "text": {
      "ru": "Солнечный свет достигает Марса примерно за 13 минут.",
      "en": "Sunlight takes about 13 minutes to reach Mars."
    },
    "source": "https://science.nasa.gov/mars/facts/"
  },
  {
    "id": "u-01",
    "text": {
      "ru": "Уран вращается почти на боку: его ось наклонена примерно на 98 градусов.",
      "en": "Uranus spins almost on its side, with an axial tilt of about 98 degrees."
    },
    "source": "https://science.nasa.gov/uranus/facts/"
  },
  {
    "id": "u-02",
    "text": {
      "ru": "Уран стал первой планетой, открытой с помощью телескопа.",
      "en": "Uranus was the first planet discovered using a telescope."
    },
    "source": "https://science.nasa.gov/uranus/facts/"
  },
  {
    "id": "u-03",
    "text": {
      "ru": "Уильям Гершель открыл Уран в 1781 году, сначала приняв его за комету или звезду.",
      "en": "William Herschel discovered Uranus in 1781, initially thinking it was a comet or a star."
    },
    "source": "https://science.nasa.gov/uranus/facts/"
  },
  {
    "id": "u-04",
    "text": {
      "ru": "Один год на Уране длится около 84 земных лет.",
      "en": "One year on Uranus lasts about 84 Earth years."
    },
    "source": "https://science.nasa.gov/uranus/facts/"
  },
  {
    "id": "u-05",
    "text": {
      "ru": "Солнечный свет добирается до Урана примерно за 2 часа 40 минут.",
      "en": "Sunlight takes about 2 hours and 40 minutes to reach Uranus."
    },
    "source": "https://science.nasa.gov/uranus/facts/"
  },
  {
    "id": "t-01",
    "text": {
      "ru": "Кольца есть не только у Сатурна — он просто самый эффектный их обладатель.",
      "en": "Saturn is not the only planet with rings; its rings are simply the most spectacular."
    },
    "source": "https://science.nasa.gov/saturn/facts/"
  },
  {
    "id": "t-02",
    "text": {
      "ru": "Сатурн состоит в основном из водорода и гелия.",
      "en": "Saturn is made mostly of hydrogen and helium."
    },
    "source": "https://science.nasa.gov/saturn/facts/"
  },
  {
    "id": "t-03",
    "text": {
      "ru": "На Энцеладе, спутнике Сатурна, в космос бьют струи воды.",
      "en": "Jets of water spray into space from Saturn’s moon Enceladus."
    },
    "source": "https://science.nasa.gov/saturn/facts/"
  },
  {
    "id": "t-04",
    "text": {
      "ru": "На Титане, спутнике Сатурна, есть озёра метана.",
      "en": "Saturn’s moon Titan has lakes of methane."
    },
    "source": "https://science.nasa.gov/saturn/facts/"
  },
  {
    "id": "t-05",
    "text": {
      "ru": "Солнечный свет добирается до Сатурна примерно за 80 минут.",
      "en": "Sunlight takes about 80 minutes to reach Saturn."
    },
    "source": "https://science.nasa.gov/saturn/facts/"
  },
  {
    "id": "t-06",
    "text": {
      "ru": "По диаметру Сатурн примерно в девять раз больше Земли.",
      "en": "Saturn is about nine times wider than Earth."
    },
    "source": "https://science.nasa.gov/saturn/facts/"
  }
] satisfies readonly Fact[];

/** Uniform choice among all facts except the previous one. */
export function pickNextFactIndex(previous: number | null, random: () => number = Math.random): number {
  const exclude = previous !== null && previous >= 0 && previous < platypusFacts.length;
  const next = Math.floor(random() * (platypusFacts.length - (exclude ? 1 : 0)));
  return exclude && next >= previous ? next + 1 : next;
}
