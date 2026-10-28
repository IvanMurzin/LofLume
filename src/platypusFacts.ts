import type { Fact } from './facts.ts';

// Original concise summaries. Source URLs are retained for review and future updates.
// Add a stable id, every supported language and a source; loaded only on first toy interaction.
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
      "ru": "По размеру Венера похожа на Землю — их называют близнецами.",
      "en": "Venus resembles Earth in size, earning them the nickname “twins.”"
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
  },
  {
    "id": "fact-0051",
    "text": {
      "ru": "Солнце — звезда, а не планета.",
      "en": "The Sun is a star, not a planet."
    },
    "source": "https://science.nasa.gov/sun/facts/"
  },
  {
    "id": "fact-0052",
    "text": {
      "ru": "Свет Солнца идёт до Земли около восьми минут.",
      "en": "Sunlight takes roughly eight minutes to reach Earth."
    },
    "source": "https://science.nasa.gov/sun/facts/"
  },
  {
    "id": "fact-0053",
    "text": {
      "ru": "На Солнце нет твёрдой поверхности.",
      "en": "The Sun has no solid surface."
    },
    "source": "https://science.nasa.gov/sun/facts/"
  },
  {
    "id": "fact-0054",
    "text": {
      "ru": "Солнечный экватор вращается быстрее солнечных полюсов.",
      "en": "The Sun’s equator rotates faster than its poles."
    },
    "source": "https://science.nasa.gov/sun/facts/"
  },
  {
    "id": "fact-0055",
    "text": {
      "ru": "Солнечные пятна холоднее окружающей поверхности.",
      "en": "Sunspots are cooler than the surrounding surface."
    },
    "source": "https://science.nasa.gov/sun/facts/"
  },
  {
    "id": "fact-0056",
    "text": {
      "ru": "Солнце получает энергию, превращая водород в гелий.",
      "en": "The Sun gets energy by fusing hydrogen into helium."
    },
    "source": "https://science.nasa.gov/sun/facts/"
  },
  {
    "id": "fact-0057",
    "text": {
      "ru": "Солнечная корона горячее видимой поверхности Солнца.",
      "en": "The solar corona is hotter than the Sun’s visible surface."
    },
    "source": "https://science.nasa.gov/sun/facts/"
  },
  {
    "id": "fact-0058",
    "text": {
      "ru": "Масса Солнца превышает массу Земли примерно в 330 тысяч раз.",
      "en": "The Sun is about 330,000 times as massive as Earth."
    },
    "source": "https://science.nasa.gov/sun/facts/"
  },
  {
    "id": "fact-0059",
    "text": {
      "ru": "Солнце тоже движется: оно обращается вокруг центра Галактики.",
      "en": "The Sun moves too: it orbits the centre of our galaxy."
    },
    "source": "https://science.nasa.gov/sun/facts/"
  },
  {
    "id": "fact-0060",
    "text": {
      "ru": "Солнцу около 4,6 миллиарда лет.",
      "en": "The Sun is about 4.6 billion years old."
    },
    "source": "https://science.nasa.gov/sun/facts/"
  },
  {
    "id": "fact-0061",
    "text": {
      "ru": "Луна светит отражённым солнечным светом.",
      "en": "The Moon shines by reflecting sunlight."
    },
    "source": "https://science.nasa.gov/moon/facts/"
  },
  {
    "id": "fact-0062",
    "text": {
      "ru": "С Земли мы в основном видим одну и ту же сторону Луны.",
      "en": "From Earth, we mostly see the same side of the Moon."
    },
    "source": "https://science.nasa.gov/moon/facts/"
  },
  {
    "id": "fact-0063",
    "text": {
      "ru": "Обратная сторона Луны тоже получает солнечный свет.",
      "en": "The Moon’s far side gets sunlight too."
    },
    "source": "https://science.nasa.gov/moon/facts/"
  },
  {
    "id": "fact-0064",
    "text": {
      "ru": "На Луне бывают лунотрясения.",
      "en": "The Moon experiences moonquakes."
    },
    "source": "https://science.nasa.gov/moon/facts/"
  },
  {
    "id": "fact-0065",
    "text": {
      "ru": "На Луне почти нет атмосферы, которая защищала бы её от метеоритов.",
      "en": "The Moon has almost no atmosphere to shield it from meteoroids."
    },
    "source": "https://science.nasa.gov/moon/facts/"
  },
  {
    "id": "fact-0066",
    "text": {
      "ru": "Тёмные лунные «моря» — равнины из древней застывшей лавы.",
      "en": "The Moon’s dark “seas” are plains of ancient solidified lava."
    },
    "source": "https://science.nasa.gov/moon/facts/"
  },
  {
    "id": "fact-0067",
    "text": {
      "ru": "Лунная пыль состоит из мелких острых частиц.",
      "en": "Moon dust is made of tiny, sharp particles."
    },
    "source": "https://science.nasa.gov/moon/facts/"
  },
  {
    "id": "fact-0068",
    "text": {
      "ru": "Луна постепенно удаляется от Земли примерно на 3,8 сантиметра в год.",
      "en": "The Moon drifts about 3.8 centimetres farther from Earth each year."
    },
    "source": "https://science.nasa.gov/moon/facts/"
  },
  {
    "id": "fact-0069",
    "text": {
      "ru": "Гравитация на Луне примерно в шесть раз слабее земной.",
      "en": "Gravity on the Moon is roughly one-sixth of Earth’s."
    },
    "source": "https://science.nasa.gov/moon/facts/"
  },
  {
    "id": "fact-0070",
    "text": {
      "ru": "В постоянно затенённых кратерах Луны обнаружен водяной лёд.",
      "en": "Water ice has been found in permanently shadowed lunar craters."
    },
    "source": "https://science.nasa.gov/moon/facts/"
  },
  {
    "id": "fact-0071",
    "text": {
      "ru": "На Меркурии нет ни колец, ни спутников.",
      "en": "Mercury has neither rings nor moons."
    },
    "source": "https://science.nasa.gov/mercury/facts/"
  },
  {
    "id": "fact-0072",
    "text": {
      "ru": "Меркурий меньше некоторых спутников планет, например Ганимеда.",
      "en": "Mercury is smaller than some planetary moons, including Ganymede."
    },
    "source": "https://science.nasa.gov/mercury/facts/"
  },
  {
    "id": "fact-0073",
    "text": {
      "ru": "Год на Меркурии длится всего 88 земных суток.",
      "en": "A year on Mercury lasts just 88 Earth days."
    },
    "source": "https://science.nasa.gov/mercury/facts/"
  },
  {
    "id": "fact-0074",
    "text": {
      "ru": "От одного восхода до следующего на Меркурии проходит около 176 земных суток.",
      "en": "One sunrise to the next on Mercury takes about 176 Earth days."
    },
    "source": "https://science.nasa.gov/mercury/facts/"
  },
  {
    "id": "fact-0075",
    "text": {
      "ru": "На Меркурии огромные перепады температуры между днём и ночью.",
      "en": "Mercury has enormous temperature swings between day and night."
    },
    "source": "https://science.nasa.gov/mercury/facts/"
  },
  {
    "id": "fact-0076",
    "text": {
      "ru": "Несмотря на близость к Солнцу, в полярных тенях Меркурия есть лёд.",
      "en": "Despite its closeness to the Sun, Mercury has ice in polar shadows."
    },
    "source": "https://science.nasa.gov/mercury/facts/"
  },
  {
    "id": "fact-0077",
    "text": {
      "ru": "Меркурий — самая маленькая планета Солнечной системы.",
      "en": "Mercury is the smallest planet in our solar system."
    },
    "source": "https://science.nasa.gov/mercury/facts/"
  },
  {
    "id": "fact-0078",
    "text": {
      "ru": "Внешняя оболочка Меркурия покрыта кратерами, как у Луны.",
      "en": "Mercury’s outer surface is cratered, much like the Moon’s."
    },
    "source": "https://science.nasa.gov/mercury/facts/"
  },
  {
    "id": "fact-0079",
    "text": {
      "ru": "У Венеры нет естественных спутников.",
      "en": "Venus has no natural moons."
    },
    "source": "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    "id": "fact-0080",
    "text": {
      "ru": "Полный оборот Венеры вокруг оси занимает дольше, чем её год.",
      "en": "Venus takes longer to spin once than to orbit the Sun."
    },
    "source": "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    "id": "fact-0081",
    "text": {
      "ru": "Из-за обратного вращения на Венере Солнце восходит на западе.",
      "en": "Because Venus spins backwards, the Sun rises in its west."
    },
    "source": "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    "id": "fact-0082",
    "text": {
      "ru": "Венера ярче любой другой планеты на земном небе.",
      "en": "Venus is brighter than any other planet in Earth’s sky."
    },
    "source": "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    "id": "fact-0083",
    "text": {
      "ru": "Облака Венеры состоят в том числе из капель серной кислоты.",
      "en": "Venus’s clouds contain droplets of sulfuric acid."
    },
    "source": "https://science.nasa.gov/venus/venus-facts/"
  },
  {
    "id": "fact-0084",
    "text": {
      "ru": "У Марса два небольших спутника: Фобос и Деймос.",
      "en": "Mars has two small moons: Phobos and Deimos."
    },
    "source": "https://science.nasa.gov/mars/facts/"
  },
  {
    "id": "fact-0085",
    "text": {
      "ru": "На Марсе есть вулкан Олимп — крупнейший известный вулкан Солнечной системы.",
      "en": "Mars has Olympus Mons, the largest known volcano in the solar system."
    },
    "source": "https://science.nasa.gov/mars/facts/"
  },
  {
    "id": "fact-0086",
    "text": {
      "ru": "Марсианские полярные шапки содержат водяной лёд и сухой лёд.",
      "en": "Mars’s polar caps contain both water ice and dry ice."
    },
    "source": "https://science.nasa.gov/mars/facts/"
  },
  {
    "id": "fact-0087",
    "text": {
      "ru": "Времена года на Марсе длиннее земных.",
      "en": "Seasons on Mars are longer than Earth’s."
    },
    "source": "https://science.nasa.gov/mars/facts/"
  },
  {
    "id": "fact-0088",
    "text": {
      "ru": "Фобос постепенно приближается к Марсу.",
      "en": "Phobos is slowly moving closer to Mars."
    },
    "source": "https://science.nasa.gov/mars/facts/"
  },
  {
    "id": "fact-0089",
    "text": {
      "ru": "На Марсе бывают пылевые бури, охватывающие почти всю планету.",
      "en": "Mars can have dust storms that cover nearly the entire planet."
    },
    "source": "https://science.nasa.gov/mars/facts/"
  },
  {
    "id": "fact-0090",
    "text": {
      "ru": "Юпитер — самая большая планета Солнечной системы.",
      "en": "Jupiter is the largest planet in our solar system."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-facts/"
  },
  {
    "id": "fact-0091",
    "text": {
      "ru": "Большое Красное Пятно Юпитера — гигантский атмосферный вихрь.",
      "en": "Jupiter’s Great Red Spot is a giant atmospheric storm."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-facts/"
  },
  {
    "id": "fact-0092",
    "text": {
      "ru": "Юпитер делает оборот вокруг оси примерно за десять часов.",
      "en": "Jupiter spins once in roughly ten hours."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-facts/"
  },
  {
    "id": "fact-0093",
    "text": {
      "ru": "У Юпитера тоже есть кольца, но они очень тусклые.",
      "en": "Jupiter has rings too, but they are very faint."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-facts/"
  },
  {
    "id": "fact-0094",
    "text": {
      "ru": "Полосы Юпитера — облачные пояса с разными ветрами.",
      "en": "Jupiter’s stripes are cloud belts with different winds."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-facts/"
  },
  {
    "id": "fact-0095",
    "text": {
      "ru": "Четыре крупнейших спутника Юпитера впервые наблюдал Галилей в 1610 году.",
      "en": "Galileo first observed Jupiter’s four largest moons in 1610."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-facts/"
  },
  {
    "id": "fact-0096",
    "text": {
      "ru": "У Юпитера нет твёрдой поверхности, на которую можно приземлиться.",
      "en": "Jupiter has no solid surface to land on."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-facts/"
  },
  {
    "id": "fact-0097",
    "text": {
      "ru": "Магнитное поле Юпитера сильнее магнитного поля Земли.",
      "en": "Jupiter’s magnetic field is stronger than Earth’s."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-facts/"
  },
  {
    "id": "fact-0098",
    "text": {
      "ru": "Ганимед — крупнейший спутник Солнечной системы.",
      "en": "Ganymede is the largest moon in the solar system."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-moons/ganymede/facts/"
  },
  {
    "id": "fact-0099",
    "text": {
      "ru": "Ганимед больше планеты Меркурий.",
      "en": "Ganymede is bigger than the planet Mercury."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-moons/ganymede/facts/"
  },
  {
    "id": "fact-0100",
    "text": {
      "ru": "У Ганимеда есть собственное магнитное поле.",
      "en": "Ganymede has its own magnetic field."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-moons/ganymede/facts/"
  },
  {
    "id": "fact-0101",
    "text": {
      "ru": "На поверхности Ганимеда есть и древние кратеры, и длинные борозды.",
      "en": "Ganymede’s surface has both ancient craters and long grooves."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-moons/ganymede/facts/"
  },
  {
    "id": "fact-0102",
    "text": {
      "ru": "Ио — самый вулканически активный мир Солнечной системы.",
      "en": "Io is the most volcanically active world in the solar system."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-moons/io/facts/"
  },
  {
    "id": "fact-0103",
    "text": {
      "ru": "Вулканы Ио могут выбрасывать вещество на сотни километров вверх.",
      "en": "Io’s volcanoes can throw material hundreds of kilometres high."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-moons/io/facts/"
  },
  {
    "id": "fact-0104",
    "text": {
      "ru": "Недра Ио разогреваются приливными силами Юпитера и соседних спутников.",
      "en": "Io’s interior is heated by tidal forces from Jupiter and nearby moons."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-moons/io/facts/"
  },
  {
    "id": "fact-0105",
    "text": {
      "ru": "Под ледяной корой Европы, по данным исследований, вероятно, находится океан.",
      "en": "Evidence strongly suggests an ocean beneath the icy crust of Jupiter’s moon Europa."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-moons/europa/europa-facts/"
  },
  {
    "id": "fact-0106",
    "text": {
      "ru": "Поверхность Европы покрыта длинными трещинами.",
      "en": "Europa’s surface is covered in long fractures."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-moons/europa/europa-facts/"
  },
  {
    "id": "fact-0107",
    "text": {
      "ru": "Европа немного меньше земной Луны.",
      "en": "Europa is slightly smaller than Earth’s Moon."
    },
    "source": "https://science.nasa.gov/jupiter/jupiter-moons/europa/europa-facts/"
  },
  {
    "id": "fact-0108",
    "text": {
      "ru": "Сатурн менее плотный, чем вода.",
      "en": "Saturn is less dense than water."
    },
    "source": "https://science.nasa.gov/saturn/facts/"
  },
  {
    "id": "fact-0109",
    "text": {
      "ru": "Кольца Сатурна состоят из множества отдельных кусочков льда и камня.",
      "en": "Saturn’s rings consist of countless separate pieces of ice and rock."
    },
    "source": "https://science.nasa.gov/saturn/facts/"
  },
  {
    "id": "fact-0110",
    "text": {
      "ru": "На северном полюсе Сатурна есть атмосферный шестиугольник.",
      "en": "Saturn has an atmospheric hexagon at its north pole."
    },
    "source": "https://science.nasa.gov/saturn/facts/"
  },
  {
    "id": "fact-0111",
    "text": {
      "ru": "Год на Сатурне длится около 29 земных лет.",
      "en": "A year on Saturn lasts about 29 Earth years."
    },
    "source": "https://science.nasa.gov/saturn/facts/"
  },
  {
    "id": "fact-0112",
    "text": {
      "ru": "Нептун открыли благодаря математическим расчётам, прежде чем уверенно опознали в телескоп.",
      "en": "Neptune was predicted mathematically before being identified through a telescope."
    },
    "source": "https://science.nasa.gov/neptune/neptune-facts/"
  },
  {
    "id": "fact-0113",
    "text": {
      "ru": "Год на Нептуне длится примерно 165 земных лет.",
      "en": "A year on Neptune lasts about 165 Earth years."
    },
    "source": "https://science.nasa.gov/neptune/neptune-facts/"
  },
  {
    "id": "fact-0114",
    "text": {
      "ru": "На Нептуне дуют одни из самых быстрых ветров Солнечной системы.",
      "en": "Neptune has some of the fastest winds in the solar system."
    },
    "source": "https://science.nasa.gov/neptune/neptune-facts/"
  },
  {
    "id": "fact-0115",
    "text": {
      "ru": "Нептун получает гораздо меньше солнечного света, чем Земля.",
      "en": "Neptune receives far less sunlight than Earth."
    },
    "source": "https://science.nasa.gov/neptune/neptune-facts/"
  },
  {
    "id": "fact-0116",
    "text": {
      "ru": "У Нептуна есть слабые кольца.",
      "en": "Neptune has faint rings."
    },
    "source": "https://science.nasa.gov/neptune/neptune-facts/"
  },
  {
    "id": "fact-0117",
    "text": {
      "ru": "Нептун — ледяной гигант, как и Уран.",
      "en": "Neptune is an ice giant, like Uranus."
    },
    "source": "https://science.nasa.gov/neptune/neptune-facts/"
  },
  {
    "id": "fact-0118",
    "text": {
      "ru": "Нептун нельзя увидеть с Земли невооружённым глазом.",
      "en": "Neptune cannot be seen from Earth with the unaided eye."
    },
    "source": "https://science.nasa.gov/neptune/neptune-facts/"
  },
  {
    "id": "fact-0119",
    "text": {
      "ru": "Плутон меньше земной Луны.",
      "en": "Pluto is smaller than Earth’s Moon."
    },
    "source": "https://science.nasa.gov/dwarf-planets/pluto/facts/"
  },
  {
    "id": "fact-0120",
    "text": {
      "ru": "На Плутоне есть горы из водяного льда.",
      "en": "Pluto has mountains made of water ice."
    },
    "source": "https://science.nasa.gov/dwarf-planets/pluto/facts/"
  },
  {
    "id": "fact-0121",
    "text": {
      "ru": "Год на Плутоне длится около 248 земных лет.",
      "en": "A year on Pluto lasts about 248 Earth years."
    },
    "source": "https://science.nasa.gov/dwarf-planets/pluto/facts/"
  },
  {
    "id": "fact-0122",
    "text": {
      "ru": "На Плутоне есть светлая область в форме сердца.",
      "en": "Pluto has a bright heart-shaped region."
    },
    "source": "https://science.nasa.gov/dwarf-planets/pluto/facts/"
  },
  {
    "id": "fact-0123",
    "text": {
      "ru": "Плутон вращается вокруг Солнца по заметно наклонённой орбите.",
      "en": "Pluto follows a noticeably tilted orbit around the Sun."
    },
    "source": "https://science.nasa.gov/dwarf-planets/pluto/facts/"
  },
  {
    "id": "fact-0124",
    "text": {
      "ru": "Атмосфера Плутона состоит в основном из азота.",
      "en": "Pluto’s atmosphere is mostly nitrogen."
    },
    "source": "https://science.nasa.gov/dwarf-planets/pluto/facts/"
  },
  {
    "id": "fact-0125",
    "text": {
      "ru": "Харон настолько велик относительно Плутона, что их общий центр масс находится вне Плутона.",
      "en": "Charon is so large relative to Pluto that their shared centre of mass lies outside Pluto."
    },
    "source": "https://science.nasa.gov/dwarf-planets/pluto/facts/"
  },
  {
    "id": "fact-0126",
    "text": {
      "ru": "Церера — карликовая планета в поясе астероидов.",
      "en": "Ceres is a dwarf planet in the asteroid belt."
    },
    "source": "https://science.nasa.gov/dwarf-planets/ceres/facts/"
  },
  {
    "id": "fact-0127",
    "text": {
      "ru": "Цереру открыли в первый день 1801 года.",
      "en": "Ceres was discovered on the first day of 1801."
    },
    "source": "https://science.nasa.gov/dwarf-planets/ceres/facts/"
  },
  {
    "id": "fact-0128",
    "text": {
      "ru": "Церера была первым открытым объектом пояса астероидов.",
      "en": "Ceres was the first asteroid-belt object to be discovered."
    },
    "source": "https://science.nasa.gov/dwarf-planets/ceres/facts/"
  },
  {
    "id": "fact-0129",
    "text": {
      "ru": "Яркие пятна в кратере Оккатор на Церере связаны с солевыми отложениями.",
      "en": "Bright spots in Ceres’s Occator crater are associated with salt deposits."
    },
    "source": "https://science.nasa.gov/dwarf-planets/ceres/facts/"
  },
  {
    "id": "fact-0130",
    "text": {
      "ru": "При приближении к Солнцу у кометы образуется облако газа и пыли — кома.",
      "en": "As a comet approaches the Sun, it develops a cloud of gas and dust called a coma."
    },
    "source": "https://science.nasa.gov/solar-system/comets/facts/"
  },
  {
    "id": "fact-0131",
    "text": {
      "ru": "Кометы состоят из льда, пыли и каменистого вещества.",
      "en": "Comets contain ice, dust and rocky material."
    },
    "source": "https://science.nasa.gov/solar-system/comets/facts/"
  },
  {
    "id": "fact-0132",
    "text": {
      "ru": "Комета может иметь два разных хвоста: пылевой и ионный.",
      "en": "A comet can have two distinct tails: a dust tail and an ion tail."
    },
    "source": "https://science.nasa.gov/solar-system/comets/facts/"
  },
  {
    "id": "fact-0133",
    "text": {
      "ru": "Ионный хвост кометы направлен от Солнца.",
      "en": "A comet’s ion tail points away from the Sun."
    },
    "source": "https://science.nasa.gov/solar-system/comets/facts/"
  },
  {
    "id": "fact-0134",
    "text": {
      "ru": "Кометы — остатки вещества ранней Солнечной системы.",
      "en": "Comets are remnants of material from the early solar system."
    },
    "source": "https://science.nasa.gov/solar-system/comets/facts/"
  },
  {
    "id": "fact-0135",
    "text": {
      "ru": "Земля слегка сплюснута у полюсов.",
      "en": "Earth is slightly flattened at its poles."
    },
    "source": "https://science.nasa.gov/earth/facts/"
  },
  {
    "id": "fact-0136",
    "text": {
      "ru": "Большую часть земной атмосферы составляет азот.",
      "en": "Nitrogen makes up most of Earth’s atmosphere."
    },
    "source": "https://science.nasa.gov/earth/facts/"
  },
  {
    "id": "fact-0137",
    "text": {
      "ru": "Земля — единственная известная нам планета с подтверждённой жизнью.",
      "en": "Earth is the only planet known to support life."
    },
    "source": "https://science.nasa.gov/earth/facts/"
  },
  {
    "id": "fact-0138",
    "text": {
      "ru": "Твёрдая внешняя оболочка Земли разделена на движущиеся плиты.",
      "en": "Earth’s solid outer shell is divided into moving plates."
    },
    "source": "https://science.nasa.gov/earth/facts/"
  },
  {
    "id": "fact-0139",
    "text": {
      "ru": "Год на Земле длится немного больше 365 суток.",
      "en": "An Earth year is slightly longer than 365 days."
    },
    "source": "https://science.nasa.gov/earth/facts/"
  },
  {
    "id": "fact-0140",
    "text": {
      "ru": "Млечный Путь — спиральная галактика с перемычкой.",
      "en": "The Milky Way is a barred spiral galaxy."
    },
    "source": "https://science.nasa.gov/universe/galaxies/"
  },
  {
    "id": "fact-0141",
    "text": {
      "ru": "Галактики состоят не только из звёзд, но и из газа, пыли и тёмной материи.",
      "en": "Galaxies contain not just stars, but gas, dust and dark matter."
    },
    "source": "https://science.nasa.gov/universe/galaxies/"
  },
  {
    "id": "fact-0142",
    "text": {
      "ru": "Кроме спиральных галактик существуют эллиптические и неправильные.",
      "en": "Besides spiral galaxies, there are elliptical and irregular galaxies."
    },
    "source": "https://science.nasa.gov/universe/galaxies/"
  },
  {
    "id": "fact-0143",
    "text": {
      "ru": "Столкновения галактик могут запускать рождение новых звёзд.",
      "en": "Galaxy collisions can trigger the birth of new stars."
    },
    "source": "https://science.nasa.gov/universe/galaxies/"
  },
  {
    "id": "fact-0144",
    "text": {
      "ru": "Хобот слона — сросшиеся нос и верхняя губа.",
      "en": "An elephant’s trunk is a fusion of its nose and upper lip."
    },
    "source": "https://animals.sandiegozoo.org/animals/elephant"
  },
  {
    "id": "fact-0145",
    "text": {
      "ru": "Бивни слона — удлинённые резцы.",
      "en": "Elephant tusks are elongated incisor teeth."
    },
    "source": "https://animals.sandiegozoo.org/animals/elephant"
  },
  {
    "id": "fact-0146",
    "text": {
      "ru": "Слоны общаются звуками, часть которых ниже порога человеческого слуха.",
      "en": "Elephants communicate with sounds that can fall below human hearing."
    },
    "source": "https://animals.sandiegozoo.org/animals/elephant"
  },
  {
    "id": "fact-0147",
    "text": {
      "ru": "Слоны охлаждаются, отдавая тепло через большие уши.",
      "en": "Elephants release heat through their large ears."
    },
    "source": "https://animals.sandiegozoo.org/animals/elephant"
  },
  {
    "id": "fact-0148",
    "text": {
      "ru": "Кончиком хобота слон может поднимать очень мелкие предметы.",
      "en": "An elephant can pick up tiny objects with the tip of its trunk."
    },
    "source": "https://animals.sandiegozoo.org/animals/elephant"
  },
  {
    "id": "fact-0149",
    "text": {
      "ru": "Коала — сумчатое животное, а не медведь.",
      "en": "A koala is a marsupial, not a bear."
    },
    "source": "https://animals.sandiegozoo.org/animals/koala"
  },
  {
    "id": "fact-0150",
    "text": {
      "ru": "Детёныш коалы продолжает развиваться в материнской сумке.",
      "en": "A koala joey continues developing inside its mother’s pouch."
    },
    "source": "https://animals.sandiegozoo.org/animals/koala"
  },
  {
    "id": "fact-0151",
    "text": {
      "ru": "Коалы питаются главным образом листьями эвкалипта.",
      "en": "Koalas eat mainly eucalyptus leaves."
    },
    "source": "https://animals.sandiegozoo.org/animals/koala"
  },
  {
    "id": "fact-0152",
    "text": {
      "ru": "Коалы выбирают лишь некоторые виды эвкалипта из множества доступных.",
      "en": "Koalas choose only certain eucalyptus species from many available kinds."
    },
    "source": "https://animals.sandiegozoo.org/animals/koala"
  },
  {
    "id": "fact-0153",
    "text": {
      "ru": "Коалы подолгу спят, экономя энергию при малопитательной диете.",
      "en": "Koalas sleep for long periods to conserve energy on their low-energy diet."
    },
    "source": "https://animals.sandiegozoo.org/animals/koala"
  },
  {
    "id": "fact-0154",
    "text": {
      "ru": "Малая панда — не маленькая версия большой панды, а представитель другого семейства.",
      "en": "The red panda belongs to a different family from the giant panda."
    },
    "source": "https://animals.sandiegozoo.org/animals/red-panda"
  },
  {
    "id": "fact-0155",
    "text": {
      "ru": "Малая панда использует длинный хвост как одеяло в холодную погоду.",
      "en": "A red panda can wrap its long tail around itself in cold weather."
    },
    "source": "https://animals.sandiegozoo.org/animals/red-panda"
  },
  {
    "id": "fact-0156",
    "text": {
      "ru": "Малые панды проводят много времени на деревьях.",
      "en": "Red pandas spend much of their time in trees."
    },
    "source": "https://animals.sandiegozoo.org/animals/red-panda"
  },
  {
    "id": "fact-0157",
    "text": {
      "ru": "У малой панды есть увеличенная кость запястья, помогающая держать бамбук.",
      "en": "A red panda has an enlarged wrist bone that helps it grip bamboo."
    },
    "source": "https://animals.sandiegozoo.org/animals/red-panda"
  },
  {
    "id": "fact-0158",
    "text": {
      "ru": "Подошвы лап малой панды покрыты мехом.",
      "en": "The soles of a red panda’s feet are covered in fur."
    },
    "source": "https://animals.sandiegozoo.org/animals/red-panda"
  },
  {
    "id": "fact-0159",
    "text": {
      "ru": "«Большой палец» панды на самом деле — видоизменённая кость запястья.",
      "en": "A giant panda’s “thumb” is actually a modified wrist bone."
    },
    "source": "https://animals.sandiegozoo.org/animals/giant-panda"
  },
  {
    "id": "fact-0160",
    "text": {
      "ru": "Несмотря на почти бамбуковую диету, большая панда относится к отряду хищных.",
      "en": "Despite its bamboo-heavy diet, the giant panda belongs to the order Carnivora."
    },
    "source": "https://animals.sandiegozoo.org/animals/giant-panda"
  },
  {
    "id": "fact-0161",
    "text": {
      "ru": "Новорождённые панды розовые и очень маленькие по сравнению с матерью.",
      "en": "Newborn pandas are pink and tiny compared with their mother."
    },
    "source": "https://animals.sandiegozoo.org/animals/giant-panda"
  },
  {
    "id": "fact-0162",
    "text": {
      "ru": "Большая панда может много часов в день тратить на поедание бамбука.",
      "en": "A giant panda can spend many hours each day eating bamboo."
    },
    "source": "https://animals.sandiegozoo.org/animals/giant-panda"
  },
  {
    "id": "fact-0163",
    "text": {
      "ru": "Большие панды умеют лазать по деревьям.",
      "en": "Giant pandas can climb trees."
    },
    "source": "https://animals.sandiegozoo.org/animals/giant-panda"
  },
  {
    "id": "fact-0164",
    "text": {
      "ru": "Розовую окраску фламинго получают из пигментов пищи.",
      "en": "Flamingos get their pink colour from pigments in their food."
    },
    "source": "https://animals.sandiegozoo.org/animals/flamingo"
  },
  {
    "id": "fact-0165",
    "text": {
      "ru": "Фламинго фильтруют пищу из воды специальным клювом.",
      "en": "Flamingos filter food from water using specialised bills."
    },
    "source": "https://animals.sandiegozoo.org/animals/flamingo"
  },
  {
    "id": "fact-0166",
    "text": {
      "ru": "При кормлении фламинго держит голову перевёрнутой.",
      "en": "A flamingo holds its head upside down while feeding."
    },
    "source": "https://animals.sandiegozoo.org/animals/flamingo"
  },
  {
    "id": "fact-0167",
    "text": {
      "ru": "Птенцы фламинго не рождаются ярко-розовыми.",
      "en": "Flamingo chicks are not born bright pink."
    },
    "source": "https://animals.sandiegozoo.org/animals/flamingo"
  },
  {
    "id": "fact-0168",
    "text": {
      "ru": "Фламинго строят гнёзда в виде небольших грязевых башенок.",
      "en": "Flamingos build nests shaped like little mud towers."
    },
    "source": "https://animals.sandiegozoo.org/animals/flamingo"
  },
  {
    "id": "fact-0169",
    "text": {
      "ru": "Страус — крупнейшая из ныне живущих птиц.",
      "en": "The ostrich is the largest living bird."
    },
    "source": "https://animals.sandiegozoo.org/animals/ostrich"
  },
  {
    "id": "fact-0170",
    "text": {
      "ru": "На каждой ноге страуса всего два пальца.",
      "en": "An ostrich has only two toes on each foot."
    },
    "source": "https://animals.sandiegozoo.org/animals/ostrich"
  },
  {
    "id": "fact-0171",
    "text": {
      "ru": "Страусы не прячут голову в песок: это распространённый миф.",
      "en": "Ostriches do not bury their heads in sand; that is a myth."
    },
    "source": "https://animals.sandiegozoo.org/animals/ostrich"
  },
  {
    "id": "fact-0172",
    "text": {
      "ru": "Самец и самка страуса могут по очереди насиживать яйца.",
      "en": "Male and female ostriches can take turns incubating eggs."
    },
    "source": "https://animals.sandiegozoo.org/animals/ostrich"
  },
  {
    "id": "fact-0173",
    "text": {
      "ru": "Страус не летает, но использует крылья при беге и демонстрациях.",
      "en": "An ostrich cannot fly but uses its wings while running and displaying."
    },
    "source": "https://animals.sandiegozoo.org/animals/ostrich"
  },
  {
    "id": "fact-0174",
    "text": {
      "ru": "Кожа белого медведя чёрная.",
      "en": "A polar bear’s skin is black."
    },
    "source": "https://animals.sandiegozoo.org/animals/polar-bear"
  },
  {
    "id": "fact-0175",
    "text": {
      "ru": "Шерсть белого медведя выглядит белой, хотя отдельные волоски прозрачные.",
      "en": "Polar bear fur looks white even though individual hairs are transparent."
    },
    "source": "https://animals.sandiegozoo.org/animals/polar-bear"
  },
  {
    "id": "fact-0176",
    "text": {
      "ru": "Белые медведи живут в Арктике, а не в Антарктиде.",
      "en": "Polar bears live in the Arctic, not Antarctica."
    },
    "source": "https://animals.sandiegozoo.org/animals/polar-bear"
  },
  {
    "id": "fact-0177",
    "text": {
      "ru": "Лапы белого медведя помогают и плавать, и распределять вес на снегу.",
      "en": "A polar bear’s paws help it swim and spread its weight on snow."
    },
    "source": "https://animals.sandiegozoo.org/animals/polar-bear"
  },
  {
    "id": "fact-0178",
    "text": {
      "ru": "Основная добыча белого медведя — тюлени.",
      "en": "Seals are a polar bear’s main prey."
    },
    "source": "https://animals.sandiegozoo.org/animals/polar-bear"
  },
  {
    "id": "fact-0179",
    "text": {
      "ru": "Гепард — самый быстрый наземный бегун среди животных.",
      "en": "The cheetah is the fastest land-running animal."
    },
    "source": "https://animals.sandiegozoo.org/animals/cheetah"
  },
  {
    "id": "fact-0180",
    "text": {
      "ru": "Хвост гепарда помогает менять направление на высокой скорости.",
      "en": "A cheetah’s tail helps it change direction at high speed."
    },
    "source": "https://animals.sandiegozoo.org/animals/cheetah"
  },
  {
    "id": "fact-0181",
    "text": {
      "ru": "Гепарды не издают громкого рёва, характерного для львов.",
      "en": "Unlike lions, cheetahs cannot roar."
    },
    "source": "https://animals.sandiegozoo.org/animals/cheetah"
  },
  {
    "id": "fact-0182",
    "text": {
      "ru": "Когти гепарда втягиваются не полностью и помогают сцеплению с землёй.",
      "en": "A cheetah’s claws do not fully retract and help it grip the ground."
    },
    "source": "https://animals.sandiegozoo.org/animals/cheetah"
  },
  {
    "id": "fact-0183",
    "text": {
      "ru": "Чёрные полосы на морде гепарда тянутся от глаз к уголкам рта.",
      "en": "A cheetah’s dark facial stripes run from its eyes toward its mouth."
    },
    "source": "https://animals.sandiegozoo.org/animals/cheetah"
  },
  {
    "id": "fact-0184",
    "text": {
      "ru": "Полосатые ноги окапи напоминают зебру, но его родственник — жираф.",
      "en": "An okapi’s striped legs resemble a zebra’s, but it is related to giraffes."
    },
    "source": "https://animals.sandiegozoo.org/animals/okapi"
  },
  {
    "id": "fact-0185",
    "text": {
      "ru": "Окапи обитает в тропических лесах Демократической Республики Конго.",
      "en": "The okapi lives in the rainforests of the Democratic Republic of the Congo."
    },
    "source": "https://animals.sandiegozoo.org/animals/okapi"
  },
  {
    "id": "fact-0186",
    "text": {
      "ru": "Длинным языком окапи захватывает листья.",
      "en": "An okapi uses its long tongue to grasp leaves."
    },
    "source": "https://animals.sandiegozoo.org/animals/okapi"
  },
  {
    "id": "fact-0187",
    "text": {
      "ru": "Узоры на задних ногах помогают различать отдельных окапи.",
      "en": "Patterns on the hind legs help identify individual okapis."
    },
    "source": "https://animals.sandiegozoo.org/animals/okapi"
  },
  {
    "id": "fact-0188",
    "text": {
      "ru": "Детёныши окапи проводят много времени, скрываясь в одном укромном месте.",
      "en": "Okapi calves spend much of their time hidden in one sheltered spot."
    },
    "source": "https://animals.sandiegozoo.org/animals/okapi"
  },
  {
    "id": "fact-0189",
    "text": {
      "ru": "Сурикаты относятся к семейству мангустовых.",
      "en": "Meerkats belong to the mongoose family."
    },
    "source": "https://animals.sandiegozoo.org/animals/meerkat"
  },
  {
    "id": "fact-0190",
    "text": {
      "ru": "В группе сурикатов отдельные животные несут дозор, пока другие кормятся.",
      "en": "Some meerkats stand guard while others in the group forage."
    },
    "source": "https://animals.sandiegozoo.org/animals/meerkat"
  },
  {
    "id": "fact-0191",
    "text": {
      "ru": "Сурикаты используют разные сигналы тревоги.",
      "en": "Meerkats use different alarm calls."
    },
    "source": "https://animals.sandiegozoo.org/animals/meerkat"
  },
  {
    "id": "fact-0192",
    "text": {
      "ru": "Тёмные пятна вокруг глаз суриката помогают уменьшать солнечные блики.",
      "en": "Dark patches around a meerkat’s eyes help reduce glare."
    },
    "source": "https://animals.sandiegozoo.org/animals/meerkat"
  },
  {
    "id": "fact-0193",
    "text": {
      "ru": "Сурикаты живут в разветвлённых подземных норах.",
      "en": "Meerkats live in extensive underground burrows."
    },
    "source": "https://animals.sandiegozoo.org/animals/meerkat"
  },
  {
    "id": "fact-0194",
    "text": {
      "ru": "Ленивцы проводят большую часть жизни, вися на деревьях.",
      "en": "Sloths spend most of their lives hanging in trees."
    },
    "source": "https://animals.sandiegozoo.org/animals/two-toed-sloth"
  },
  {
    "id": "fact-0195",
    "text": {
      "ru": "Шерсть ленивца может служить домом водорослям.",
      "en": "A sloth’s fur can provide a home for algae."
    },
    "source": "https://animals.sandiegozoo.org/animals/two-toed-sloth"
  },
  {
    "id": "fact-0196",
    "text": {
      "ru": "Ленивцы умеют плавать.",
      "en": "Sloths can swim."
    },
    "source": "https://animals.sandiegozoo.org/animals/two-toed-sloth"
  },
  {
    "id": "fact-0197",
    "text": {
      "ru": "Двупалые и трёхпалые ленивцы относятся к разным семействам.",
      "en": "Two-toed and three-toed sloths belong to different families."
    },
    "source": "https://animals.sandiegozoo.org/animals/two-toed-sloth"
  },
  {
    "id": "fact-0198",
    "text": {
      "ru": "Медленное пищеварение помогает ленивцам получать питание из листьев.",
      "en": "Slow digestion helps sloths obtain nutrients from leaves."
    },
    "source": "https://animals.sandiegozoo.org/animals/two-toed-sloth"
  },
  {
    "id": "fact-0199",
    "text": {
      "ru": "Панцирь броненосца образован костными пластинками под кожей.",
      "en": "An armadillo’s armour consists of bony plates beneath its skin."
    },
    "source": "https://animals.sandiegozoo.org/animals/armadillo"
  },
  {
    "id": "fact-0200",
    "text": {
      "ru": "Не все броненосцы умеют сворачиваться в полный шар.",
      "en": "Not all armadillos can roll into a complete ball."
    },
    "source": "https://animals.sandiegozoo.org/animals/armadillo"
  },
  {
    "id": "fact-0201",
    "text": {
      "ru": "Броненосцы — млекопитающие, несмотря на необычный панцирь.",
      "en": "Armadillos are mammals despite their unusual armour."
    },
    "source": "https://animals.sandiegozoo.org/animals/armadillo"
  },
  {
    "id": "fact-0202",
    "text": {
      "ru": "Броненосцы раскапывают почву сильными когтями в поисках пищи.",
      "en": "Armadillos dig through soil with strong claws to find food."
    },
    "source": "https://animals.sandiegozoo.org/animals/armadillo"
  },
  {
    "id": "fact-0203",
    "text": {
      "ru": "У девятипоясного броненосца обычно рождаются четыре генетически одинаковых детёныша.",
      "en": "Nine-banded armadillos usually give birth to four genetically identical young."
    },
    "source": "https://animals.sandiegozoo.org/animals/armadillo"
  },
  {
    "id": "fact-0204",
    "text": {
      "ru": "У муравьедов нет зубов.",
      "en": "Anteaters have no teeth."
    },
    "source": "https://animals.sandiegozoo.org/animals/giant-anteater"
  },
  {
    "id": "fact-0205",
    "text": {
      "ru": "Муравьеды собирают насекомых длинным липким языком.",
      "en": "Anteaters collect insects with a long, sticky tongue."
    },
    "source": "https://animals.sandiegozoo.org/animals/giant-anteater"
  },
  {
    "id": "fact-0206",
    "text": {
      "ru": "Гигантский муравьед может прикрываться пушистым хвостом во время отдыха.",
      "en": "A giant anteater can cover itself with its bushy tail while resting."
    },
    "source": "https://animals.sandiegozoo.org/animals/giant-anteater"
  },
  {
    "id": "fact-0207",
    "text": {
      "ru": "Муравьед вскрывает муравейники мощными передними когтями.",
      "en": "An anteater opens ant nests with powerful front claws."
    },
    "source": "https://animals.sandiegozoo.org/animals/giant-anteater"
  },
  {
    "id": "fact-0208",
    "text": {
      "ru": "Муравьеды питаются не только муравьями, но и термитами.",
      "en": "Anteaters eat termites as well as ants."
    },
    "source": "https://animals.sandiegozoo.org/animals/giant-anteater"
  },
  {
    "id": "fact-0209",
    "text": {
      "ru": "В горбах верблюда хранится жир, а не вода.",
      "en": "A camel’s hump stores fat, not water."
    },
    "source": "https://animals.sandiegozoo.org/animals/camel"
  },
  {
    "id": "fact-0210",
    "text": {
      "ru": "У одногорбого верблюда один горб, у двугорбого — два.",
      "en": "A dromedary has one hump; a Bactrian camel has two."
    },
    "source": "https://animals.sandiegozoo.org/animals/camel"
  },
  {
    "id": "fact-0211",
    "text": {
      "ru": "Широкие ступни верблюда помогают не проваливаться в песок.",
      "en": "A camel’s broad feet help keep it from sinking into sand."
    },
    "source": "https://animals.sandiegozoo.org/animals/camel"
  },
  {
    "id": "fact-0212",
    "text": {
      "ru": "Верблюды могут закрывать ноздри, защищаясь от песка.",
      "en": "Camels can close their nostrils to keep out sand."
    },
    "source": "https://animals.sandiegozoo.org/animals/camel"
  },
  {
    "id": "fact-0213",
    "text": {
      "ru": "Длинные ресницы помогают защищать глаза верблюда от песка.",
      "en": "Long eyelashes help protect a camel’s eyes from sand."
    },
    "source": "https://animals.sandiegozoo.org/animals/camel"
  },
  {
    "id": "fact-0214",
    "text": {
      "ru": "Бородавочники часто пасутся, опираясь на согнутые передние ноги.",
      "en": "Warthogs often graze on their bent front legs."
    },
    "source": "https://animals.sandiegozoo.org/animals/warthog"
  },
  {
    "id": "fact-0215",
    "text": {
      "ru": "Бородавочники могут использовать норы, выкопанные другими животными.",
      "en": "Warthogs can use burrows dug by other animals."
    },
    "source": "https://animals.sandiegozoo.org/animals/warthog"
  },
  {
    "id": "fact-0216",
    "text": {
      "ru": "При беге бородавочник часто поднимает хвост вертикально.",
      "en": "A running warthog often holds its tail upright."
    },
    "source": "https://animals.sandiegozoo.org/animals/warthog"
  },
  {
    "id": "fact-0217",
    "text": {
      "ru": "Бивни бородавочника — увеличенные клыки.",
      "en": "A warthog’s tusks are enlarged canine teeth."
    },
    "source": "https://animals.sandiegozoo.org/animals/warthog"
  },
  {
    "id": "fact-0218",
    "text": {
      "ru": "Название бородавочника связано с защитными кожными наростами на морде.",
      "en": "The warthog’s name refers to protective growths on its face."
    },
    "source": "https://animals.sandiegozoo.org/animals/warthog"
  },
  {
    "id": "fact-0219",
    "text": {
      "ru": "Рог носорога состоит из кератина — того же белка, что и наши ногти.",
      "en": "A rhino’s horn is made of keratin, the protein found in our nails."
    },
    "source": "https://animals.sandiegozoo.org/animals/rhinoceros"
  },
  {
    "id": "fact-0220",
    "text": {
      "ru": "У некоторых видов носорогов один рог, у других — два.",
      "en": "Some rhino species have one horn; others have two."
    },
    "source": "https://animals.sandiegozoo.org/animals/rhinoceros"
  },
  {
    "id": "fact-0221",
    "text": {
      "ru": "Грязевые ванны помогают носорогам охлаждаться и защищать кожу.",
      "en": "Mud baths help rhinos cool down and protect their skin."
    },
    "source": "https://animals.sandiegozoo.org/animals/rhinoceros"
  },
  {
    "id": "fact-0222",
    "text": {
      "ru": "Чёрные и белые носороги отличаются формой губ, а не контрастным цветом.",
      "en": "Black and white rhinos differ in lip shape, not sharply contrasting colour."
    },
    "source": "https://animals.sandiegozoo.org/animals/rhinoceros"
  },
  {
    "id": "fact-0223",
    "text": {
      "ru": "Белый носорог щиплет траву широкой губой.",
      "en": "A white rhino grazes using its broad lip."
    },
    "source": "https://animals.sandiegozoo.org/animals/rhinoceros"
  },
  {
    "id": "fact-0224",
    "text": {
      "ru": "Полосы каждого тигра образуют индивидуальный рисунок.",
      "en": "Every tiger has an individual stripe pattern."
    },
    "source": "https://animals.sandiegozoo.org/animals/tiger"
  },
  {
    "id": "fact-0225",
    "text": {
      "ru": "Тигры хорошо плавают.",
      "en": "Tigers are strong swimmers."
    },
    "source": "https://animals.sandiegozoo.org/animals/tiger"
  },
  {
    "id": "fact-0226",
    "text": {
      "ru": "Тигр — крупнейший представитель семейства кошачьих.",
      "en": "The tiger is the largest member of the cat family."
    },
    "source": "https://animals.sandiegozoo.org/animals/tiger"
  },
  {
    "id": "fact-0227",
    "text": {
      "ru": "Обычно тигры охотятся в одиночку.",
      "en": "Tigers usually hunt alone."
    },
    "source": "https://animals.sandiegozoo.org/animals/tiger"
  },
  {
    "id": "fact-0228",
    "text": {
      "ru": "У белого тигра светлая окраска — генетическая особенность, а не отдельный вид.",
      "en": "A white tiger’s pale colour is a genetic trait, not a separate species."
    },
    "source": "https://animals.sandiegozoo.org/animals/tiger"
  },
  {
    "id": "fact-0229",
    "text": {
      "ru": "Леопарды могут затаскивать добычу на деревья.",
      "en": "Leopards can haul their prey into trees."
    },
    "source": "https://animals.sandiegozoo.org/animals/leopard"
  },
  {
    "id": "fact-0230",
    "text": {
      "ru": "Пятна леопарда образуют узоры-розетки.",
      "en": "A leopard’s spots form rosette patterns."
    },
    "source": "https://animals.sandiegozoo.org/animals/leopard"
  },
  {
    "id": "fact-0231",
    "text": {
      "ru": "Чёрная пантера может быть леопардом с тёмной окраской.",
      "en": "A black panther can be a dark-coloured leopard."
    },
    "source": "https://animals.sandiegozoo.org/animals/leopard"
  },
  {
    "id": "fact-0232",
    "text": {
      "ru": "У тёмного леопарда при подходящем освещении всё ещё видны пятна.",
      "en": "A dark leopard’s spots can still be seen in suitable light."
    },
    "source": "https://animals.sandiegozoo.org/animals/leopard"
  },
  {
    "id": "fact-0233",
    "text": {
      "ru": "Леопарды приспосабливаются к самым разным местообитаниям.",
      "en": "Leopards adapt to a wide range of habitats."
    },
    "source": "https://animals.sandiegozoo.org/animals/leopard"
  },
  {
    "id": "fact-0234",
    "text": {
      "ru": "Львы живут семейными группами — прайдами.",
      "en": "Lions live in family groups called prides."
    },
    "source": "https://animals.sandiegozoo.org/animals/lion"
  },
  {
    "id": "fact-0235",
    "text": {
      "ru": "Львицы часто охотятся совместно.",
      "en": "Lionesses often hunt together."
    },
    "source": "https://animals.sandiegozoo.org/animals/lion"
  },
  {
    "id": "fact-0236",
    "text": {
      "ru": "Грива характерна для взрослых самцов льва.",
      "en": "A mane is characteristic of adult male lions."
    },
    "source": "https://animals.sandiegozoo.org/animals/lion"
  },
  {
    "id": "fact-0237",
    "text": {
      "ru": "Львы могут отдыхать большую часть суток.",
      "en": "Lions may rest for most of the day."
    },
    "source": "https://animals.sandiegozoo.org/animals/lion"
  },
  {
    "id": "fact-0238",
    "text": {
      "ru": "Рёв помогает львам обозначать территорию и поддерживать связь.",
      "en": "Roaring helps lions mark territory and stay in contact."
    },
    "source": "https://animals.sandiegozoo.org/animals/lion"
  },
  {
    "id": "fact-0239",
    "text": {
      "ru": "Узор шерсти каждой гиеновидной собаки уникален.",
      "en": "Each African wild dog has a unique coat pattern."
    },
    "source": "https://www.awf.org/wildlife-conservation/african-wild-dog"
  },
  {
    "id": "fact-0240",
    "text": {
      "ru": "Гиеновидные собаки охотятся слаженной стаей.",
      "en": "African wild dogs hunt as a coordinated pack."
    },
    "source": "https://www.awf.org/wildlife-conservation/african-wild-dog"
  },
  {
    "id": "fact-0241",
    "text": {
      "ru": "У гиеновидных собак крупные уши, напоминающие уши летучей мыши.",
      "en": "African wild dogs have large ears that resemble a bat’s."
    },
    "source": "https://www.awf.org/wildlife-conservation/african-wild-dog"
  },
  {
    "id": "fact-0242",
    "text": {
      "ru": "Белый кончик хвоста может помогать гиеновидным собакам следить за стаей на охоте.",
      "en": "The white tail tip may help African wild dogs keep track of their pack while hunting."
    },
    "source": "https://www.awf.org/wildlife-conservation/african-wild-dog"
  },
  {
    "id": "fact-0243",
    "text": {
      "ru": "Взрослые гиеновидные собаки делятся пищей со щенками.",
      "en": "Adult African wild dogs share food with their pups."
    },
    "source": "https://www.awf.org/wildlife-conservation/african-wild-dog"
  },
  {
    "id": "fact-0244",
    "text": {
      "ru": "Роскошный «хвост» павлина в основном образован удлинёнными кроющими перьями.",
      "en": "A peacock’s spectacular “tail” is mostly elongated cover feathers."
    },
    "source": "https://animals.sandiegozoo.org/animals/peafowl"
  },
  {
    "id": "fact-0245",
    "text": {
      "ru": "Яркий шлейф павлина используют в брачных демонстрациях.",
      "en": "A peacock uses its colourful train in courtship displays."
    },
    "source": "https://animals.sandiegozoo.org/animals/peafowl"
  },
  {
    "id": "fact-0246",
    "text": {
      "ru": "Павы, самки павлинов, окрашены скромнее самцов.",
      "en": "Peahens, the females, are less colourful than males."
    },
    "source": "https://animals.sandiegozoo.org/animals/peafowl"
  },
  {
    "id": "fact-0247",
    "text": {
      "ru": "Павлины способны летать, несмотря на длинное оперение.",
      "en": "Peafowl can fly despite their long plumage."
    },
    "source": "https://animals.sandiegozoo.org/animals/peafowl"
  },
  {
    "id": "fact-0248",
    "text": {
      "ru": "Ночью павлины могут отдыхать на деревьях.",
      "en": "Peafowl can roost in trees at night."
    },
    "source": "https://animals.sandiegozoo.org/animals/peafowl"
  },
  {
    "id": "fact-0249",
    "text": {
      "ru": "Лицевой диск совы помогает направлять звук к ушам.",
      "en": "An owl’s facial disc helps direct sound toward its ears."
    },
    "source": "https://animals.sandiegozoo.org/animals/owl"
  },
  {
    "id": "fact-0250",
    "text": {
      "ru": "Глаза совы почти не двигаются в глазницах.",
      "en": "An owl’s eyes move very little in their sockets."
    },
    "source": "https://animals.sandiegozoo.org/animals/owl"
  },
  {
    "id": "fact-0251",
    "text": {
      "ru": "Мягкие края перьев помогают многим совам летать почти бесшумно.",
      "en": "Soft feather edges help many owls fly almost silently."
    },
    "source": "https://animals.sandiegozoo.org/animals/owl"
  },
  {
    "id": "fact-0252",
    "text": {
      "ru": "Совы отрыгивают непереваренные кости и шерсть в виде погадок.",
      "en": "Owls regurgitate undigested bones and fur in pellets."
    },
    "source": "https://animals.sandiegozoo.org/animals/owl"
  },
  {
    "id": "fact-0253",
    "text": {
      "ru": "«Ушки» некоторых сов — пучки перьев, а не настоящие уши.",
      "en": "The “ear tufts” of some owls are feathers, not actual ears."
    },
    "source": "https://animals.sandiegozoo.org/animals/owl"
  },
  {
    "id": "fact-0254",
    "text": {
      "ru": "Большой клюв тукана гораздо легче, чем кажется.",
      "en": "A toucan’s large bill is much lighter than it looks."
    },
    "source": "https://animals.sandiegozoo.org/animals/toucan"
  },
  {
    "id": "fact-0255",
    "text": {
      "ru": "Туканы гнездятся в дуплах деревьев.",
      "en": "Toucans nest in tree cavities."
    },
    "source": "https://animals.sandiegozoo.org/animals/toucan"
  },
  {
    "id": "fact-0256",
    "text": {
      "ru": "Длинным клювом тукан может доставать плоды с тонких веточек.",
      "en": "A toucan’s long bill can reach fruit on slender branches."
    },
    "source": "https://animals.sandiegozoo.org/animals/toucan"
  },
  {
    "id": "fact-0257",
    "text": {
      "ru": "Туканы питаются не только плодами, но и животной пищей.",
      "en": "Toucans eat animal food as well as fruit."
    },
    "source": "https://animals.sandiegozoo.org/animals/toucan"
  },
  {
    "id": "fact-0258",
    "text": {
      "ru": "Перед сном тукан может прятать клюв под перьями спины.",
      "en": "A toucan can tuck its bill into its back feathers to sleep."
    },
    "source": "https://animals.sandiegozoo.org/animals/toucan"
  },
  {
    "id": "fact-0259",
    "text": {
      "ru": "Киви — нелетающая птица Новой Зеландии.",
      "en": "The kiwi is a flightless bird from New Zealand."
    },
    "source": "https://animals.sandiegozoo.org/animals/kiwi"
  },
  {
    "id": "fact-0260",
    "text": {
      "ru": "Ноздри киви находятся у кончика длинного клюва.",
      "en": "A kiwi’s nostrils sit near the tip of its long bill."
    },
    "source": "https://animals.sandiegozoo.org/animals/kiwi"
  },
  {
    "id": "fact-0261",
    "text": {
      "ru": "Киви находит пищу в том числе с помощью обоняния.",
      "en": "A kiwi finds food partly through its sense of smell."
    },
    "source": "https://animals.sandiegozoo.org/animals/kiwi"
  },
  {
    "id": "fact-0262",
    "text": {
      "ru": "Перья киви по виду напоминают волосы.",
      "en": "Kiwi feathers look rather like hair."
    },
    "source": "https://animals.sandiegozoo.org/animals/kiwi"
  },
  {
    "id": "fact-0263",
    "text": {
      "ru": "Яйцо киви очень велико по отношению к размеру самой птицы.",
      "en": "A kiwi’s egg is very large relative to the bird’s body size."
    },
    "source": "https://animals.sandiegozoo.org/animals/kiwi"
  },
  {
    "id": "fact-0264",
    "text": {
      "ru": "Казуары не летают, но отлично бегают.",
      "en": "Cassowaries cannot fly but are excellent runners."
    },
    "source": "https://animals.sandiegozoo.org/animals/cassowary"
  },
  {
    "id": "fact-0265",
    "text": {
      "ru": "Казуары помогают лесу, разнося семена съеденных плодов.",
      "en": "Cassowaries help forests by spreading seeds from fruit they eat."
    },
    "source": "https://animals.sandiegozoo.org/animals/cassowary"
  },
  {
    "id": "fact-0266",
    "text": {
      "ru": "На голове казуара есть твёрдый вырост — шлем.",
      "en": "A cassowary has a firm head growth called a casque."
    },
    "source": "https://animals.sandiegozoo.org/animals/cassowary"
  },
  {
    "id": "fact-0267",
    "text": {
      "ru": "У казуара на внутреннем пальце ноги длинный острый коготь.",
      "en": "A cassowary has a long, sharp claw on its inner toe."
    },
    "source": "https://animals.sandiegozoo.org/animals/cassowary"
  },
  {
    "id": "fact-0268",
    "text": {
      "ru": "Яйца казуара насиживает самец, он же заботится о птенцах.",
      "en": "A male cassowary incubates the eggs and cares for the chicks."
    },
    "source": "https://animals.sandiegozoo.org/animals/cassowary"
  },
  {
    "id": "fact-0269",
    "text": {
      "ru": "Эму — вторая по высоте современная птица после страуса.",
      "en": "The emu is the second-tallest living bird after the ostrich."
    },
    "source": "https://animals.sandiegozoo.org/animals/emu"
  },
  {
    "id": "fact-0270",
    "text": {
      "ru": "Эму родом из Австралии.",
      "en": "Emus are native to Australia."
    },
    "source": "https://animals.sandiegozoo.org/animals/emu"
  },
  {
    "id": "fact-0271",
    "text": {
      "ru": "Самец эму насиживает яйца.",
      "en": "The male emu incubates the eggs."
    },
    "source": "https://animals.sandiegozoo.org/animals/emu"
  },
  {
    "id": "fact-0272",
    "text": {
      "ru": "Птенцы эму носят полосатую маскировочную окраску.",
      "en": "Emu chicks have striped camouflage plumage."
    },
    "source": "https://animals.sandiegozoo.org/animals/emu"
  },
  {
    "id": "fact-0273",
    "text": {
      "ru": "Длинные ноги помогают эму быстро бегать.",
      "en": "Long legs help emus run fast."
    },
    "source": "https://animals.sandiegozoo.org/animals/emu"
  },
  {
    "id": "fact-0274",
    "text": {
      "ru": "Горловой мешок пеликана служит для ловли пищи, а не её долгого хранения.",
      "en": "A pelican’s throat pouch catches food rather than storing it for long periods."
    },
    "source": "https://animals.sandiegozoo.org/animals/pelican"
  },
  {
    "id": "fact-0275",
    "text": {
      "ru": "Перед глотанием пеликан выпускает из горлового мешка лишнюю воду.",
      "en": "A pelican drains excess water from its pouch before swallowing."
    },
    "source": "https://animals.sandiegozoo.org/animals/pelican"
  },
  {
    "id": "fact-0276",
    "text": {
      "ru": "Пеликаны могут лететь строем, используя потоки воздуха.",
      "en": "Pelicans can fly in formation using air currents."
    },
    "source": "https://animals.sandiegozoo.org/animals/pelican"
  },
  {
    "id": "fact-0277",
    "text": {
      "ru": "У пеликанов перепонка соединяет все четыре пальца лапы.",
      "en": "In pelicans, webbing connects all four toes on each foot."
    },
    "source": "https://animals.sandiegozoo.org/animals/pelican"
  },
  {
    "id": "fact-0278",
    "text": {
      "ru": "Бурые пеликаны ловят рыбу, ныряя в воду с воздуха.",
      "en": "Brown pelicans catch fish by plunge-diving from the air."
    },
    "source": "https://animals.sandiegozoo.org/animals/pelican"
  },
  {
    "id": "fact-0279",
    "text": {
      "ru": "Колибри способны летать назад.",
      "en": "Hummingbirds can fly backwards."
    },
    "source": "https://animals.sandiegozoo.org/animals/hummingbird"
  },
  {
    "id": "fact-0280",
    "text": {
      "ru": "Колибри могут зависать перед цветком.",
      "en": "Hummingbirds can hover in front of flowers."
    },
    "source": "https://animals.sandiegozoo.org/animals/hummingbird"
  },
  {
    "id": "fact-0281",
    "text": {
      "ru": "Колибри едят мелких насекомых наряду с нектаром.",
      "en": "Hummingbirds eat small insects as well as nectar."
    },
    "source": "https://animals.sandiegozoo.org/animals/hummingbird"
  },
  {
    "id": "fact-0282",
    "text": {
      "ru": "Многие колибри ночью впадают в оцепенение для экономии энергии.",
      "en": "Many hummingbirds enter torpor at night to save energy."
    },
    "source": "https://animals.sandiegozoo.org/animals/hummingbird"
  },
  {
    "id": "fact-0283",
    "text": {
      "ru": "Язык колибри помогает быстро собирать нектар из цветков.",
      "en": "A hummingbird’s tongue helps it collect nectar rapidly from flowers."
    },
    "source": "https://animals.sandiegozoo.org/animals/hummingbird"
  },
  {
    "id": "fact-0284",
    "text": {
      "ru": "У попугая два пальца ноги направлены вперёд и два назад.",
      "en": "A parrot has two toes pointing forward and two backward."
    },
    "source": "https://animals.sandiegozoo.org/animals/parrot"
  },
  {
    "id": "fact-0285",
    "text": {
      "ru": "Попугаи могут пользоваться лапой, чтобы держать пищу.",
      "en": "Parrots can use a foot to hold food."
    },
    "source": "https://animals.sandiegozoo.org/animals/parrot"
  },
  {
    "id": "fact-0286",
    "text": {
      "ru": "Крепкий изогнутый клюв помогает попугаям вскрывать семена и орехи.",
      "en": "A strong, curved bill helps parrots open seeds and nuts."
    },
    "source": "https://animals.sandiegozoo.org/animals/parrot"
  },
  {
    "id": "fact-0287",
    "text": {
      "ru": "Некоторые попугаи подражают звукам человеческой речи.",
      "en": "Some parrots imitate the sounds of human speech."
    },
    "source": "https://animals.sandiegozoo.org/animals/parrot"
  },
  {
    "id": "fact-0288",
    "text": {
      "ru": "У попугаев подвижная верхняя часть клюва.",
      "en": "Parrots have a movable upper bill."
    },
    "source": "https://animals.sandiegozoo.org/animals/parrot"
  },
  {
    "id": "fact-0289",
    "text": {
      "ru": "У многих птиц-носорогов над клювом есть вырост, называемый шлемом.",
      "en": "Many hornbills have a growth above the bill called a casque."
    },
    "source": "https://animals.sandiegozoo.org/animals/hornbill"
  },
  {
    "id": "fact-0290",
    "text": {
      "ru": "Самки многих птиц-носорогов замуровываются в дупле на время гнездования.",
      "en": "Females of many hornbill species seal themselves into nest cavities."
    },
    "source": "https://animals.sandiegozoo.org/animals/hornbill"
  },
  {
    "id": "fact-0291",
    "text": {
      "ru": "Самец птицы-носорога может передавать корм самке через узкую щель в гнезде.",
      "en": "A male hornbill may pass food to the female through a narrow nest opening."
    },
    "source": "https://animals.sandiegozoo.org/animals/hornbill"
  },
  {
    "id": "fact-0292",
    "text": {
      "ru": "Птицы-носороги помогают распространять семена тропических деревьев.",
      "en": "Hornbills help spread the seeds of tropical trees."
    },
    "source": "https://animals.sandiegozoo.org/animals/hornbill"
  },
  {
    "id": "fact-0293",
    "text": {
      "ru": "Длинные клювы птиц-носорогов помогают доставать плоды.",
      "en": "Hornbills use their long bills to reach fruit."
    },
    "source": "https://animals.sandiegozoo.org/animals/hornbill"
  },
  {
    "id": "fact-0294",
    "text": {
      "ru": "Хамелеоны меняют окраску не только для маскировки, но и для общения.",
      "en": "Chameleons change colour for communication as well as camouflage."
    },
    "source": "https://animals.sandiegozoo.org/animals/chameleon"
  },
  {
    "id": "fact-0295",
    "text": {
      "ru": "Глаза хамелеона могут двигаться независимо друг от друга.",
      "en": "A chameleon’s eyes can move independently."
    },
    "source": "https://animals.sandiegozoo.org/animals/chameleon"
  },
  {
    "id": "fact-0296",
    "text": {
      "ru": "Хамелеон ловит добычу длинным выбрасываемым языком.",
      "en": "A chameleon catches prey with a long, projectile tongue."
    },
    "source": "https://animals.sandiegozoo.org/animals/chameleon"
  },
  {
    "id": "fact-0297",
    "text": {
      "ru": "Многие хамелеоны используют цепкий хвост, чтобы держаться за ветви.",
      "en": "Many chameleons use a prehensile tail to grip branches."
    },
    "source": "https://animals.sandiegozoo.org/animals/chameleon"
  },
  {
    "id": "fact-0298",
    "text": {
      "ru": "Пальцы хамелеона собраны в противопоставленные группы для захвата ветвей.",
      "en": "A chameleon’s toes form opposing groups for gripping branches."
    },
    "source": "https://animals.sandiegozoo.org/animals/chameleon"
  },
  {
    "id": "fact-0299",
    "text": {
      "ru": "Многие гекконы держатся на гладких поверхностях благодаря микроскопическим волоскам на пальцах.",
      "en": "Many geckos grip smooth surfaces using microscopic hairs on their toes."
    },
    "source": "https://animals.sandiegozoo.org/animals/lizard"
  },
  {
    "id": "fact-0300",
    "text": {
      "ru": "У многих гекконов нет подвижных век.",
      "en": "Many geckos have no movable eyelids."
    },
    "source": "https://animals.sandiegozoo.org/animals/lizard"
  },
  {
    "id": "fact-0301",
    "text": {
      "ru": "Некоторые гекконы очищают глаза языком.",
      "en": "Some geckos clean their eyes with their tongue."
    },
    "source": "https://animals.sandiegozoo.org/animals/lizard"
  },
  {
    "id": "fact-0302",
    "text": {
      "ru": "Некоторые гекконы отбрасывают хвост, чтобы отвлечь хищника.",
      "en": "Some geckos shed their tails to distract a predator."
    },
    "source": "https://animals.sandiegozoo.org/animals/lizard"
  },
  {
    "id": "fact-0303",
    "text": {
      "ru": "Гекконы умеют издавать разнообразные звуки.",
      "en": "Geckos can make a variety of sounds."
    },
    "source": "https://animals.sandiegozoo.org/animals/lizard"
  },
  {
    "id": "fact-0304",
    "text": {
      "ru": "Змеи воспринимают запахи, собирая частицы раздвоенным языком.",
      "en": "Snakes gather scent particles with their forked tongues."
    },
    "source": "https://animals.sandiegozoo.org/animals/snake"
  },
  {
    "id": "fact-0305",
    "text": {
      "ru": "У змей нет наружных ушных отверстий.",
      "en": "Snakes have no external ear openings."
    },
    "source": "https://animals.sandiegozoo.org/animals/snake"
  },
  {
    "id": "fact-0306",
    "text": {
      "ru": "Змеи сбрасывают наружный слой кожи по мере роста.",
      "en": "Snakes shed the outer layer of skin as they grow."
    },
    "source": "https://animals.sandiegozoo.org/animals/snake"
  },
  {
    "id": "fact-0307",
    "text": {
      "ru": "Нижние челюсти змеи соединены гибкими тканями, позволяющими широко раскрывать рот.",
      "en": "A snake’s lower jaws are joined by flexible tissue that permits a wide gape."
    },
    "source": "https://animals.sandiegozoo.org/animals/snake"
  },
  {
    "id": "fact-0308",
    "text": {
      "ru": "Не все змеи откладывают яйца: некоторые рождают живых детёнышей.",
      "en": "Not all snakes lay eggs; some give birth to live young."
    },
    "source": "https://animals.sandiegozoo.org/animals/snake"
  },
  {
    "id": "fact-0309",
    "text": {
      "ru": "Панцирь черепахи — часть её скелета, а не съёмный домик.",
      "en": "A tortoise’s shell is part of its skeleton, not a removable house."
    },
    "source": "https://animals.sandiegozoo.org/animals/turtle-and-tortoise"
  },
  {
    "id": "fact-0310",
    "text": {
      "ru": "Панцирь черепахи связан с рёбрами и позвоночником.",
      "en": "A tortoise’s shell is connected to its ribs and spine."
    },
    "source": "https://animals.sandiegozoo.org/animals/turtle-and-tortoise"
  },
  {
    "id": "fact-0311",
    "text": {
      "ru": "Вместо зубов у черепах роговой клюв.",
      "en": "Tortoises have a horny beak instead of teeth."
    },
    "source": "https://animals.sandiegozoo.org/animals/turtle-and-tortoise"
  },
  {
    "id": "fact-0312",
    "text": {
      "ru": "Гигантские черепахи могут жить больше ста лет.",
      "en": "Giant tortoises can live for more than a century."
    },
    "source": "https://animals.sandiegozoo.org/animals/turtle-and-tortoise"
  },
  {
    "id": "fact-0313",
    "text": {
      "ru": "Черепахи — холоднокровные животные и зависят от внешнего тепла.",
      "en": "Tortoises are cold-blooded and depend on external warmth."
    },
    "source": "https://animals.sandiegozoo.org/animals/turtle-and-tortoise"
  },
  {
    "id": "fact-0314",
    "text": {
      "ru": "Крокодилы ближе к птицам, чем к ящерицам, по эволюционному родству.",
      "en": "Crocodilians are evolutionarily closer to birds than to lizards."
    },
    "source": "https://animals.sandiegozoo.org/animals/crocodilian"
  },
  {
    "id": "fact-0315",
    "text": {
      "ru": "У крокодилов четырёхкамерное сердце.",
      "en": "Crocodilians have four-chambered hearts."
    },
    "source": "https://animals.sandiegozoo.org/animals/crocodilian"
  },
  {
    "id": "fact-0316",
    "text": {
      "ru": "Крокодилы многократно сменяют зубы в течение жизни.",
      "en": "Crocodilians replace their teeth repeatedly throughout life."
    },
    "source": "https://animals.sandiegozoo.org/animals/crocodilian"
  },
  {
    "id": "fact-0317",
    "text": {
      "ru": "Самки крокодилов охраняют гнёзда и помогают детёнышам.",
      "en": "Female crocodilians guard their nests and help their young."
    },
    "source": "https://animals.sandiegozoo.org/animals/crocodilian"
  },
  {
    "id": "fact-0318",
    "text": {
      "ru": "Крокодил может переносить детёнышей во рту, не причиняя им вреда.",
      "en": "A crocodilian can carry its young in its mouth without harming them."
    },
    "source": "https://animals.sandiegozoo.org/animals/crocodilian"
  },
  {
    "id": "fact-0319",
    "text": {
      "ru": "Многие лягушки впитывают воду через кожу.",
      "en": "Many frogs absorb water through their skin."
    },
    "source": "https://animals.sandiegozoo.org/animals/frog-and-toad"
  },
  {
    "id": "fact-0320",
    "text": {
      "ru": "Головастики и взрослые лягушки часто питаются совершенно разной пищей.",
      "en": "Tadpoles and adult frogs often eat very different foods."
    },
    "source": "https://animals.sandiegozoo.org/animals/frog-and-toad"
  },
  {
    "id": "fact-0321",
    "text": {
      "ru": "При превращении в лягушку головастик постепенно теряет хвост.",
      "en": "As a tadpole becomes a frog, it gradually loses its tail."
    },
    "source": "https://animals.sandiegozoo.org/animals/frog-and-toad"
  },
  {
    "id": "fact-0322",
    "text": {
      "ru": "Лягушки — земноводные, а не рептилии.",
      "en": "Frogs are amphibians, not reptiles."
    },
    "source": "https://animals.sandiegozoo.org/animals/frog-and-toad"
  },
  {
    "id": "fact-0323",
    "text": {
      "ru": "Некоторые древесные лягушки цепляются за поверхности расширенными подушечками пальцев.",
      "en": "Some tree frogs cling to surfaces with expanded toe pads."
    },
    "source": "https://animals.sandiegozoo.org/animals/frog-and-toad"
  },
  {
    "id": "fact-0324",
    "text": {
      "ru": "Аксолотль может размножаться, сохраняя личиночные черты.",
      "en": "An axolotl can reproduce while retaining larval features."
    },
    "source": "https://animals.sandiegozoo.org/animals/axolotl"
  },
  {
    "id": "fact-0325",
    "text": {
      "ru": "У аксолотля наружные жабры, похожие на пушистые веточки.",
      "en": "An axolotl has external gills that resemble feathery branches."
    },
    "source": "https://animals.sandiegozoo.org/animals/axolotl"
  },
  {
    "id": "fact-0326",
    "text": {
      "ru": "Аксолотли способны восстанавливать утраченные конечности.",
      "en": "Axolotls can regrow lost limbs."
    },
    "source": "https://animals.sandiegozoo.org/animals/axolotl"
  },
  {
    "id": "fact-0327",
    "text": {
      "ru": "Аксолотль — хвостатое земноводное, а не рыба.",
      "en": "An axolotl is a salamander, not a fish."
    },
    "source": "https://animals.sandiegozoo.org/animals/axolotl"
  },
  {
    "id": "fact-0328",
    "text": {
      "ru": "Дикие аксолотли происходят из водоёмов в районе Мехико.",
      "en": "Wild axolotls originate from waters around Mexico City."
    },
    "source": "https://animals.sandiegozoo.org/animals/axolotl"
  },
  {
    "id": "fact-0329",
    "text": {
      "ru": "Бабочки пробуют поверхности на вкус рецепторами на лапках.",
      "en": "Butterflies taste surfaces using receptors on their feet."
    },
    "source": "https://animals.sandiegozoo.org/animals/butterfly-moth-and-skipper"
  },
  {
    "id": "fact-0330",
    "text": {
      "ru": "Крылья бабочек покрыты крошечными чешуйками.",
      "en": "Butterfly wings are covered with tiny scales."
    },
    "source": "https://animals.sandiegozoo.org/animals/butterfly-moth-and-skipper"
  },
  {
    "id": "fact-0331",
    "text": {
      "ru": "Гусеница и бабочка — две стадии жизни одного животного.",
      "en": "A caterpillar and a butterfly are stages of the same animal’s life."
    },
    "source": "https://animals.sandiegozoo.org/animals/butterfly-moth-and-skipper"
  },
  {
    "id": "fact-0332",
    "text": {
      "ru": "Многие бабочки пьют жидкую пищу сворачивающимся хоботком.",
      "en": "Many butterflies drink liquid food through a coiled proboscis."
    },
    "source": "https://animals.sandiegozoo.org/animals/butterfly-moth-and-skipper"
  },
  {
    "id": "fact-0333",
    "text": {
      "ru": "Во время метаморфоза гусеница превращается в бабочку внутри куколки.",
      "en": "During metamorphosis, a caterpillar becomes a butterfly inside a chrysalis."
    },
    "source": "https://animals.sandiegozoo.org/animals/butterfly-moth-and-skipper"
  },
  {
    "id": "fact-0334",
    "text": {
      "ru": "Стрекозы проводят раннюю часть жизни в воде.",
      "en": "Dragonflies spend the early part of their lives in water."
    },
    "source": "https://british-dragonflies.org.uk/odonata/life-cycle-and-biology/"
  },
  {
    "id": "fact-0335",
    "text": {
      "ru": "Личинки стрекоз — хищники.",
      "en": "Dragonfly larvae are predators."
    },
    "source": "https://british-dragonflies.org.uk/odonata/life-cycle-and-biology/"
  },
  {
    "id": "fact-0336",
    "text": {
      "ru": "Стрекоза может управлять передней и задней парами крыльев по-разному.",
      "en": "A dragonfly can control its front and rear wing pairs differently."
    },
    "source": "https://british-dragonflies.org.uk/odonata/life-cycle-and-biology/"
  },
  {
    "id": "fact-0337",
    "text": {
      "ru": "Взрослые стрекозы ловят насекомых на лету.",
      "en": "Adult dragonflies catch insects in flight."
    },
    "source": "https://british-dragonflies.org.uk/odonata/life-cycle-and-biology/"
  },
  {
    "id": "fact-0338",
    "text": {
      "ru": "У стрекоз огромные сложные глаза из множества зрительных элементов.",
      "en": "Dragonflies have huge compound eyes made of many visual units."
    },
    "source": "https://british-dragonflies.org.uk/odonata/life-cycle-and-biology/"
  },
  {
    "id": "fact-0339",
    "text": {
      "ru": "Палочники маскируются под веточки и листья.",
      "en": "Stick insects camouflage themselves as twigs and leaves."
    },
    "source": "https://animals.sandiegozoo.org/animals/stick-insect"
  },
  {
    "id": "fact-0340",
    "text": {
      "ru": "Некоторые палочники покачиваются, напоминая ветку на ветру.",
      "en": "Some stick insects sway like a twig in the wind."
    },
    "source": "https://animals.sandiegozoo.org/animals/stick-insect"
  },
  {
    "id": "fact-0341",
    "text": {
      "ru": "У некоторых видов палочников самки размножаются без самцов.",
      "en": "Females of some stick insect species reproduce without males."
    },
    "source": "https://animals.sandiegozoo.org/animals/stick-insect"
  },
  {
    "id": "fact-0342",
    "text": {
      "ru": "Молодые палочники могут восстанавливать потерянные ноги при линьке.",
      "en": "Young stick insects can regrow lost legs when they moult."
    },
    "source": "https://animals.sandiegozoo.org/animals/stick-insect"
  },
  {
    "id": "fact-0343",
    "text": {
      "ru": "Палочники в основном питаются листьями.",
      "en": "Stick insects mainly eat leaves."
    },
    "source": "https://animals.sandiegozoo.org/animals/stick-insect"
  },
  {
    "id": "fact-0344",
    "text": {
      "ru": "В глубоком океане солнечный свет исчезает, хотя наверху может быть полдень.",
      "en": "Deep in the ocean, sunlight disappears even when it is noon above."
    },
    "source": "https://oceanservice.noaa.gov/facts/light_travel.html"
  },
  {
    "id": "fact-0345",
    "text": {
      "ru": "Фотосинтез в океане в основном ограничен верхним освещённым слоем.",
      "en": "Ocean photosynthesis is mainly limited to the upper, sunlit layer."
    },
    "source": "https://oceanservice.noaa.gov/facts/light_travel.html"
  },
  {
    "id": "fact-0346",
    "text": {
      "ru": "Между примерно 200 и 1000 метрами глубины находится океанская сумеречная зона.",
      "en": "The ocean’s twilight zone lies roughly between 200 and 1,000 metres deep."
    },
    "source": "https://oceanservice.noaa.gov/facts/light_travel.html"
  },
  {
    "id": "fact-0347",
    "text": {
      "ru": "Свет в морской воде ослабевает по мере увеличения глубины.",
      "en": "Light in seawater fades with increasing depth."
    },
    "source": "https://oceanservice.noaa.gov/facts/light_travel.html"
  },
  {
    "id": "fact-0348",
    "text": {
      "ru": "В морской воде звук распространяется примерно в четыре раза быстрее, чем в воздухе.",
      "en": "Sound travels roughly four times faster in seawater than in air."
    },
    "source": "https://oceanservice.noaa.gov/facts/sound.html"
  },
  {
    "id": "fact-0349",
    "text": {
      "ru": "Температура и давление воды меняют скорость звука в океане.",
      "en": "Water temperature and pressure change the speed of sound in the ocean."
    },
    "source": "https://oceanservice.noaa.gov/facts/sound.html"
  },
  {
    "id": "fact-0350",
    "text": {
      "ru": "Звуковые волны в океане могут изгибаться при переходе между разными слоями воды.",
      "en": "Ocean sound waves can bend as they pass between different water layers."
    },
    "source": "https://oceanservice.noaa.gov/facts/sound.html"
  },
  {
    "id": "fact-0351",
    "text": {
      "ru": "В определённых слоях океана звук способен распространяться на огромные расстояния.",
      "en": "In certain ocean layers, sound can travel enormous distances."
    },
    "source": "https://oceanservice.noaa.gov/facts/sound.html"
  },
  {
    "id": "fact-0352",
    "text": {
      "ru": "Приливы связаны с гравитационным действием и Луны, и Солнца.",
      "en": "Tides are influenced by the gravitational pull of both the Moon and the Sun."
    },
    "source": "https://oceanservice.noaa.gov/facts/tides.html"
  },
  {
    "id": "fact-0353",
    "text": {
      "ru": "Прилив — это очень длинная волна, проходящая через океан.",
      "en": "A tide is a very long wave moving through the ocean."
    },
    "source": "https://oceanservice.noaa.gov/facts/tides.html"
  },
  {
    "id": "fact-0354",
    "text": {
      "ru": "Приливной диапазон — разница уровня воды между приливом и отливом.",
      "en": "Tidal range is the difference between high and low water levels."
    },
    "source": "https://oceanservice.noaa.gov/facts/tides.html"
  },
  {
    "id": "fact-0355",
    "text": {
      "ru": "Приливная волна становится заметна у берега как подъём и спад уровня воды.",
      "en": "A tidal wave becomes visible at the coast as rising and falling water levels."
    },
    "source": "https://oceanservice.noaa.gov/facts/tides.html"
  },
  {
    "id": "fact-0356",
    "text": {
      "ru": "Айсберг образуется, когда кусок льда откалывается от ледника или шельфового льда.",
      "en": "An iceberg forms when ice breaks off a glacier or ice shelf."
    },
    "source": "https://oceanservice.noaa.gov/facts/iceberg.html"
  },
  {
    "id": "fact-0357",
    "text": {
      "ru": "Небольшие обломки айсбергов имеют собственные названия, например «гроулеры».",
      "en": "Small iceberg fragments have their own names, including “growlers.”"
    },
    "source": "https://oceanservice.noaa.gov/facts/iceberg.html"
  },
  {
    "id": "fact-0358",
    "text": {
      "ru": "Айсберг — плавающий лёд, а не остров из скалы.",
      "en": "An iceberg is floating ice, not an island made of rock."
    },
    "source": "https://oceanservice.noaa.gov/facts/iceberg.html"
  },
  {
    "id": "fact-0359",
    "text": {
      "ru": "Крупный айсберг может распадаться на множество меньших ледяных обломков.",
      "en": "A large iceberg can split into many smaller ice fragments."
    },
    "source": "https://oceanservice.noaa.gov/facts/iceberg.html"
  },
  {
    "id": "fact-0360",
    "text": {
      "ru": "Водоросли бывают не только зелёными, но и красными или бурыми.",
      "en": "Seaweeds can be red or brown as well as green."
    },
    "source": "https://oceanservice.noaa.gov/facts/seaweed.html"
  },
  {
    "id": "fact-0361",
    "text": {
      "ru": "Гигантские бурые водоросли образуют подводные леса.",
      "en": "Giant kelp forms underwater forests."
    },
    "source": "https://oceanservice.noaa.gov/facts/seaweed.html"
  },
  {
    "id": "fact-0362",
    "text": {
      "ru": "Микроскопический фитопланктон лежит в основе многих морских пищевых цепей.",
      "en": "Microscopic phytoplankton forms the base of many marine food chains."
    },
    "source": "https://oceanservice.noaa.gov/facts/seaweed.html"
  },
  {
    "id": "fact-0363",
    "text": {
      "ru": "Морские водоросли служат животным одновременно пищей и укрытием.",
      "en": "Seaweeds provide animals with both food and shelter."
    },
    "source": "https://oceanservice.noaa.gov/facts/seaweed.html"
  },
  {
    "id": "fact-0364",
    "text": {
      "ru": "В эстуариях обычно смешиваются пресная речная и солёная морская вода.",
      "en": "In estuaries, fresh river water usually mixes with salty seawater."
    },
    "source": "https://oceanservice.noaa.gov/facts/estuary.html"
  },
  {
    "id": "fact-0365",
    "text": {
      "ru": "Солоноватая вода — смесь пресной и солёной.",
      "en": "Brackish water is a mixture of fresh and salt water."
    },
    "source": "https://oceanservice.noaa.gov/facts/estuary.html"
  },
  {
    "id": "fact-0366",
    "text": {
      "ru": "Эстуарии служат «детскими садами» для многих рыб.",
      "en": "Estuaries serve as nursery grounds for many fish."
    },
    "source": "https://oceanservice.noaa.gov/facts/estuary.html"
  },
  {
    "id": "fact-0367",
    "text": {
      "ru": "Некоторые эстуарии бывают полностью пресноводными.",
      "en": "Some estuaries are entirely freshwater."
    },
    "source": "https://oceanservice.noaa.gov/facts/estuary.html"
  },
  {
    "id": "fact-0368",
    "text": {
      "ru": "Прибрежные водно-болотные угодья могут естественно фильтровать сток с суши.",
      "en": "Coastal wetlands can naturally filter runoff from land."
    },
    "source": "https://oceanservice.noaa.gov/facts/estuary.html"
  },
  {
    "id": "fact-0369",
    "text": {
      "ru": "Многие перелётные животные используют эстуарии как остановки в пути.",
      "en": "Many migrating animals use estuaries as stopovers."
    },
    "source": "https://oceanservice.noaa.gov/facts/estuary.html"
  },
  {
    "id": "fact-0370",
    "text": {
      "ru": "Гидротермальные источники существуют на океанском дне.",
      "en": "Hydrothermal vents exist on the ocean floor."
    },
    "source": "https://oceanservice.noaa.gov/facts/vents.html"
  },
  {
    "id": "fact-0371",
    "text": {
      "ru": "Подводные «чёрные курильщики» окрашены частицами минералов, а не сажей.",
      "en": "Underwater “black smokers” are coloured by mineral particles, not soot."
    },
    "source": "https://oceanservice.noaa.gov/facts/vents.html"
  },
  {
    "id": "fact-0372",
    "text": {
      "ru": "Некоторые глубоководные сообщества получают энергию из химических реакций, а не солнечного света.",
      "en": "Some deep-sea communities get energy from chemical reactions rather than sunlight."
    },
    "source": "https://oceanservice.noaa.gov/facts/vents.html"
  },
  {
    "id": "fact-0373",
    "text": {
      "ru": "Первые гидротермальные источники учёные обнаружили у Галапагосов в 1977 году.",
      "en": "Scientists first discovered hydrothermal vents near the Galápagos in 1977."
    },
    "source": "https://oceanservice.noaa.gov/facts/vents.html"
  },
  {
    "id": "fact-0374",
    "text": {
      "ru": "Давление в море увеличивается примерно на одну атмосферу каждые десять метров глубины.",
      "en": "Sea pressure rises by about one atmosphere for every ten metres of depth."
    },
    "source": "https://oceanservice.noaa.gov/facts/pressure.html"
  },
  {
    "id": "fact-0375",
    "text": {
      "ru": "На больших глубинах вода давит на объект со всех сторон.",
      "en": "At great depths, water presses on an object from all directions."
    },
    "source": "https://oceanservice.noaa.gov/facts/pressure.html"
  },
  {
    "id": "fact-0376",
    "text": {
      "ru": "Некоторые киты способны охотиться на глубине более двух километров.",
      "en": "Some whales can hunt more than two kilometres below the surface."
    },
    "source": "https://oceanservice.noaa.gov/facts/pressure.html"
  },
  {
    "id": "fact-0377",
    "text": {
      "ru": "Гибкая грудная клетка помогает китам переносить изменения давления при погружении.",
      "en": "A flexible rib cage helps whales cope with pressure changes while diving."
    },
    "source": "https://oceanservice.noaa.gov/facts/pressure.html"
  },
  {
    "id": "fact-0378",
    "text": {
      "ru": "Мангры растут в прибрежной зоне, которую периодически заливают приливы.",
      "en": "Mangroves grow in coastal areas periodically flooded by tides."
    },
    "source": "https://oceanservice.noaa.gov/facts/mangroves.html"
  },
  {
    "id": "fact-0379",
    "text": {
      "ru": "Опорные корни некоторых мангров напоминают ходули.",
      "en": "The prop roots of some mangroves resemble stilts."
    },
    "source": "https://oceanservice.noaa.gov/facts/mangroves.html"
  },
  {
    "id": "fact-0380",
    "text": {
      "ru": "Мангровые корни замедляют воду и задерживают осадок.",
      "en": "Mangrove roots slow water and trap sediment."
    },
    "source": "https://oceanservice.noaa.gov/facts/mangroves.html"
  },
  {
    "id": "fact-0381",
    "text": {
      "ru": "Мангровые леса помогают защищать берега от эрозии.",
      "en": "Mangrove forests help protect shorelines from erosion."
    },
    "source": "https://oceanservice.noaa.gov/facts/mangroves.html"
  },
  {
    "id": "fact-0382",
    "text": {
      "ru": "Сплетения мангровых корней дают рыбам укрытие от хищников.",
      "en": "Tangled mangrove roots give fish shelter from predators."
    },
    "source": "https://oceanservice.noaa.gov/facts/mangroves.html"
  },
  {
    "id": "fact-0383",
    "text": {
      "ru": "Мангры растут в тропиках и субтропиках, где нет сильных морозов.",
      "en": "Mangroves grow in tropical and subtropical regions without severe freezing."
    },
    "source": "https://oceanservice.noaa.gov/facts/mangroves.html"
  },
  {
    "id": "fact-0384",
    "text": {
      "ru": "Число π нельзя точно записать отношением двух целых чисел.",
      "en": "Pi cannot be written exactly as a ratio of two integers."
    },
    "source": "https://mathworld.wolfram.com/Pi.html"
  },
  {
    "id": "fact-0385",
    "text": {
      "ru": "Десятичные цифры π продолжаются бесконечно и не образуют повторяющегося периода.",
      "en": "Pi’s decimal digits continue forever without a repeating period."
    },
    "source": "https://mathworld.wolfram.com/Pi.html"
  },
  {
    "id": "fact-0386",
    "text": {
      "ru": "Для любой окружности отношение длины к диаметру равно π.",
      "en": "For every circle, circumference divided by diameter equals pi."
    },
    "source": "https://mathworld.wolfram.com/Pi.html"
  },
  {
    "id": "fact-0387",
    "text": {
      "ru": "При удвоении радиуса площадь круга увеличивается в четыре раза.",
      "en": "Doubling a circle’s radius makes its area four times larger."
    },
    "source": "https://mathworld.wolfram.com/Pi.html"
  },
  {
    "id": "fact-0388",
    "text": {
      "ru": "Двойка — единственное чётное простое число.",
      "en": "Two is the only even prime number."
    },
    "source": "https://mathworld.wolfram.com/PrimeNumber.html"
  },
  {
    "id": "fact-0389",
    "text": {
      "ru": "Простых чисел бесконечно много.",
      "en": "There are infinitely many prime numbers."
    },
    "source": "https://mathworld.wolfram.com/PrimeNumber.html"
  },
  {
    "id": "fact-0390",
    "text": {
      "ru": "Единица не считается простым числом.",
      "en": "One is not considered a prime number."
    },
    "source": "https://mathworld.wolfram.com/PrimeNumber.html"
  },
  {
    "id": "fact-0391",
    "text": {
      "ru": "У простого числа ровно два положительных делителя: единица и оно само.",
      "en": "A prime number has exactly two positive divisors: one and itself."
    },
    "source": "https://mathworld.wolfram.com/PrimeNumber.html"
  },
  {
    "id": "fact-0392",
    "text": {
      "ru": "В последовательности Фибоначчи каждое следующее число — сумма двух предыдущих.",
      "en": "In the Fibonacci sequence, each new number is the sum of the previous two."
    },
    "source": "https://mathworld.wolfram.com/FibonacciNumber.html"
  },
  {
    "id": "fact-0393",
    "text": {
      "ru": "Отношение соседних больших чисел Фибоначчи приближается к золотому сечению.",
      "en": "The ratio of consecutive large Fibonacci numbers approaches the golden ratio."
    },
    "source": "https://mathworld.wolfram.com/FibonacciNumber.html"
  },
  {
    "id": "fact-0394",
    "text": {
      "ru": "Каждое третье число Фибоначчи чётное.",
      "en": "Every third Fibonacci number is even."
    },
    "source": "https://mathworld.wolfram.com/FibonacciNumber.html"
  },
  {
    "id": "fact-0395",
    "text": {
      "ru": "Сумма квадратов двух соседних чисел Фибоначчи тоже является числом Фибоначчи.",
      "en": "The sum of the squares of consecutive Fibonacci numbers is another Fibonacci number."
    },
    "source": "https://mathworld.wolfram.com/FibonacciNumber.html"
  },
  {
    "id": "fact-0396",
    "text": {
      "ru": "У ленты Мёбиуса одна сторона.",
      "en": "A Möbius strip has one side."
    },
    "source": "https://mathworld.wolfram.com/MoebiusStrip.html"
  },
  {
    "id": "fact-0397",
    "text": {
      "ru": "У ленты Мёбиуса только один край.",
      "en": "A Möbius strip has only one edge."
    },
    "source": "https://mathworld.wolfram.com/MoebiusStrip.html"
  },
  {
    "id": "fact-0398",
    "text": {
      "ru": "Ленту Мёбиуса можно сделать, склеив бумажную полоску с полуоборотом.",
      "en": "You can make a Möbius strip by joining a paper strip with a half-twist."
    },
    "source": "https://mathworld.wolfram.com/MoebiusStrip.html"
  },
  {
    "id": "fact-0399",
    "text": {
      "ru": "Разрезав ленту Мёбиуса вдоль середины, получишь одну длинную ленту, а не две отдельные.",
      "en": "Cutting a Möbius strip along its centre produces one longer band, not two separate ones."
    },
    "source": "https://mathworld.wolfram.com/MoebiusStrip.html"
  },
  {
    "id": "fact-0400",
    "text": {
      "ru": "Правильных выпуклых многогранников существует ровно пять.",
      "en": "There are exactly five convex regular polyhedra."
    },
    "source": "https://mathworld.wolfram.com/PlatonicSolid.html"
  },
  {
    "id": "fact-0401",
    "text": {
      "ru": "У куба шесть граней, двенадцать рёбер и восемь вершин.",
      "en": "A cube has six faces, twelve edges and eight vertices."
    },
    "source": "https://mathworld.wolfram.com/PlatonicSolid.html"
  },
  {
    "id": "fact-0402",
    "text": {
      "ru": "У правильного тетраэдра четыре треугольные грани.",
      "en": "A regular tetrahedron has four triangular faces."
    },
    "source": "https://mathworld.wolfram.com/PlatonicSolid.html"
  },
  {
    "id": "fact-0403",
    "text": {
      "ru": "У правильного додекаэдра двенадцать пятиугольных граней.",
      "en": "A regular dodecahedron has twelve pentagonal faces."
    },
    "source": "https://mathworld.wolfram.com/PlatonicSolid.html"
  },
  {
    "id": "fact-0404",
    "text": {
      "ru": "У фракталов похожие структуры повторяются на разных масштабах.",
      "en": "Fractals repeat similar kinds of structure at different scales."
    },
    "source": "https://mathworld.wolfram.com/Fractal.html"
  },
  {
    "id": "fact-0405",
    "text": {
      "ru": "Фрактальная размерность не обязана быть целым числом.",
      "en": "A fractal dimension does not have to be a whole number."
    },
    "source": "https://mathworld.wolfram.com/Fractal.html"
  },
  {
    "id": "fact-0406",
    "text": {
      "ru": "Измеренная длина береговой линии зависит от размера используемой «линейки».",
      "en": "A measured coastline length depends on the size of the “ruler” used."
    },
    "source": "https://mathworld.wolfram.com/Fractal.html"
  },
  {
    "id": "fact-0407",
    "text": {
      "ru": "Чем мельче масштаб измерения извилистого берега, тем больше деталей попадает в его длину.",
      "en": "Measuring a winding coast at finer scales includes more detail in its length."
    },
    "source": "https://mathworld.wolfram.com/Fractal.html"
  },
  {
    "id": "fact-0408",
    "text": {
      "ru": "Мнимая единица i при возведении в квадрат даёт −1.",
      "en": "The imaginary unit i gives −1 when squared."
    },
    "source": "https://mathworld.wolfram.com/ImaginaryNumber.html"
  },
  {
    "id": "fact-0409",
    "text": {
      "ru": "Комплексное число может иметь действительную и мнимую части.",
      "en": "A complex number can have real and imaginary parts."
    },
    "source": "https://mathworld.wolfram.com/ImaginaryNumber.html"
  },
  {
    "id": "fact-0410",
    "text": {
      "ru": "Числа i и −i оба являются квадратными корнями из −1.",
      "en": "Both i and −i are square roots of −1."
    },
    "source": "https://mathworld.wolfram.com/ImaginaryNumber.html"
  },
  {
    "id": "fact-0411",
    "text": {
      "ru": "Умножение на i поворачивает точку комплексной плоскости на четверть оборота.",
      "en": "Multiplying by i rotates a point in the complex plane by a quarter-turn."
    },
    "source": "https://mathworld.wolfram.com/ImaginaryNumber.html"
  },
  {
    "id": "fact-0412",
    "text": {
      "ru": "Гугол — это единица со ста нулями.",
      "en": "A googol is one followed by a hundred zeros."
    },
    "source": "https://mathworld.wolfram.com/Googol.html"
  },
  {
    "id": "fact-0413",
    "text": {
      "ru": "Слово «гугол» придумал девятилетний Милтон Сиротта.",
      "en": "The word “googol” was coined by nine-year-old Milton Sirotta."
    },
    "source": "https://mathworld.wolfram.com/Googol.html"
  },
  {
    "id": "fact-0414",
    "text": {
      "ru": "Гуголплекс — это десять в степени гугол.",
      "en": "A googolplex is ten raised to the power of a googol."
    },
    "source": "https://mathworld.wolfram.com/Googol.html"
  },
  {
    "id": "fact-0415",
    "text": {
      "ru": "Гугол — огромное, но всё же конечное число.",
      "en": "A googol is enormous, but still finite."
    },
    "source": "https://mathworld.wolfram.com/Googol.html"
  },
  {
    "id": "fact-0416",
    "text": {
      "ru": "В модели с равновероятными днями рождения в группе из 23 человек вероятность совпадения превышает половину.",
      "en": "With equally likely birthdays, a group of 23 has over a 50% chance of a shared birthday."
    },
    "source": "https://mathworld.wolfram.com/BirthdayProblem.html"
  },
  {
    "id": "fact-0417",
    "text": {
      "ru": "В группе из 23 человек можно составить 253 разные пары.",
      "en": "A group of 23 people contains 253 different pairs."
    },
    "source": "https://mathworld.wolfram.com/BirthdayProblem.html"
  },
  {
    "id": "fact-0418",
    "text": {
      "ru": "Совпадение любых двух дней рождения вероятнее, чем совпадение именно с твоим.",
      "en": "Any shared birthday is more likely than a match with your own birthday specifically."
    },
    "source": "https://mathworld.wolfram.com/BirthdayProblem.html"
  },
  {
    "id": "fact-0419",
    "text": {
      "ru": "Парадокс дней рождения связан с быстрым ростом числа возможных пар.",
      "en": "The birthday paradox comes from the rapid growth in the number of possible pairs."
    },
    "source": "https://mathworld.wolfram.com/BirthdayProblem.html"
  },
  {
    "id": "fact-0420",
    "text": {
      "ru": "В треугольнике Паскаля каждое внутреннее число — сумма двух чисел над ним.",
      "en": "In Pascal’s triangle, each interior number is the sum of the two above it."
    },
    "source": "https://mathworld.wolfram.com/PascalsTriangle.html"
  },
  {
    "id": "fact-0421",
    "text": {
      "ru": "Строки треугольника Паскаля симметричны.",
      "en": "The rows of Pascal’s triangle are symmetrical."
    },
    "source": "https://mathworld.wolfram.com/PascalsTriangle.html"
  },
  {
    "id": "fact-0422",
    "text": {
      "ru": "Сумма чисел в каждой следующей строке треугольника Паскаля удваивается.",
      "en": "The sum of each successive row of Pascal’s triangle doubles."
    },
    "source": "https://mathworld.wolfram.com/PascalsTriangle.html"
  },
  {
    "id": "fact-0423",
    "text": {
      "ru": "Треугольник Паскаля помогает считать, сколько способов выбрать несколько предметов из набора.",
      "en": "Pascal’s triangle helps count ways to choose several items from a set."
    },
    "source": "https://mathworld.wolfram.com/PascalsTriangle.html"
  },
  {
    "id": "fact-0424",
    "text": {
      "ru": "Python назван в честь «Монти Пайтона», а не змеи.",
      "en": "Python was named after Monty Python, not the snake."
    },
    "source": "https://docs.python.org/3/faq/general.html"
  },
  {
    "id": "fact-0425",
    "text": {
      "ru": "Первую версию Python Гвидо ван Россум опубликовал в 1991 году.",
      "en": "Guido van Rossum first published Python in 1991."
    },
    "source": "https://docs.python.org/3/faq/general.html"
  },
  {
    "id": "fact-0426",
    "text": {
      "ru": "Python создавался как преемник идей языка ABC.",
      "en": "Python was created as a successor to ideas from the ABC language."
    },
    "source": "https://docs.python.org/3/faq/general.html"
  },
  {
    "id": "fact-0427",
    "text": {
      "ru": "Python можно использовать бесплатно, в том числе в коммерческих проектах.",
      "en": "Python can be used free of charge, including in commercial projects."
    },
    "source": "https://docs.python.org/3/faq/general.html"
  },
  {
    "id": "fact-0428",
    "text": {
      "ru": "QR-код разработали в Японии для производственных задач.",
      "en": "The QR code was developed in Japan for manufacturing uses."
    },
    "source": "https://www.qrcode.com/en/history/"
  },
  {
    "id": "fact-0429",
    "text": {
      "ru": "QR означает Quick Response — «быстрый отклик».",
      "en": "QR stands for Quick Response."
    },
    "source": "https://www.qrcode.com/en/history/"
  },
  {
    "id": "fact-0430",
    "text": {
      "ru": "Три характерных квадрата QR-кода помогают сканеру определить его положение.",
      "en": "A QR code’s three distinctive squares help a scanner locate it."
    },
    "source": "https://www.qrcode.com/en/history/"
  },
  {
    "id": "fact-0431",
    "text": {
      "ru": "Первый QR-код представили в 1994 году.",
      "en": "The first QR code was introduced in 1994."
    },
    "source": "https://www.qrcode.com/en/history/"
  },
  {
    "id": "fact-0432",
    "text": {
      "ru": "В UTF-8 одна допустимая кодовая точка Unicode занимает от одного до четырёх байтов.",
      "en": "In UTF-8, one Unicode scalar value can occupy one to four bytes."
    },
    "source": "https://www.unicode.org/faq/utf_bom.html"
  },
  {
    "id": "fact-0433",
    "text": {
      "ru": "Обычные латинские буквы в UTF-8 занимают по одному байту.",
      "en": "Basic Latin letters take one byte each in UTF-8."
    },
    "source": "https://www.unicode.org/faq/utf_bom.html"
  },
  {
    "id": "fact-0434",
    "text": {
      "ru": "UTF-8 и UTF-16 могут представлять один и тот же набор символов разными байтами.",
      "en": "UTF-8 and UTF-16 can represent the same characters using different bytes."
    },
    "source": "https://www.unicode.org/faq/utf_bom.html"
  },
  {
    "id": "fact-0435",
    "text": {
      "ru": "Unicode — не только алфавиты: он включает знаки, символы и эмодзи.",
      "en": "Unicode includes signs, symbols and emoji, not just alphabets."
    },
    "source": "https://www.unicode.org/faq/utf_bom.html"
  },
  {
    "id": "fact-0436",
    "text": {
      "ru": "В распределённой системе контроля версий копия проекта может хранить всю историю изменений.",
      "en": "In distributed version control, a project copy can contain its entire change history."
    },
    "source": "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control"
  },
  {
    "id": "fact-0437",
    "text": {
      "ru": "Контроль версий полезен не только для кода, но и для обычных текстовых файлов.",
      "en": "Version control is useful for ordinary text files as well as code."
    },
    "source": "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control"
  },
  {
    "id": "fact-0438",
    "text": {
      "ru": "История версий позволяет узнать, кто и когда изменил конкретный фрагмент файла.",
      "en": "Version history can show who changed a particular part of a file and when."
    },
    "source": "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control"
  },
  {
    "id": "fact-0439",
    "text": {
      "ru": "Система контроля версий позволяет сравнивать разные состояния одного файла.",
      "en": "A version-control system can compare different states of the same file."
    },
    "source": "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control"
  },
  {
    "id": "fact-0440",
    "text": {
      "ru": "Доменные имена образуют иерархию, а не один плоский список.",
      "en": "Domain names form a hierarchy rather than one flat list."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc1034.txt"
  },
  {
    "id": "fact-0441",
    "text": {
      "ru": "Полное доменное имя технически может оканчиваться точкой.",
      "en": "A fully qualified domain name can technically end with a dot."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc1034.txt"
  },
  {
    "id": "fact-0442",
    "text": {
      "ru": "DNS хранит разные типы записей, а не только адреса сайтов.",
      "en": "DNS stores different record types, not just website addresses."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc1034.txt"
  },
  {
    "id": "fact-0443",
    "text": {
      "ru": "DNS-ответы можно кэшировать, поэтому один запрос не всегда доходит до исходного сервера.",
      "en": "DNS answers can be cached, so a query does not always reach the original server."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc1034.txt"
  },
  {
    "id": "fact-0444",
    "text": {
      "ru": "HTTP — протокол обмена сообщениями, а не формат веб-страницы.",
      "en": "HTTP is a message-exchange protocol, not a webpage format."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc9110.txt"
  },
  {
    "id": "fact-0445",
    "text": {
      "ru": "Код HTTP 404 означает, что запрошенный ресурс не найден.",
      "en": "HTTP status 404 means the requested resource was not found."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc9110.txt"
  },
  {
    "id": "fact-0446",
    "text": {
      "ru": "HTTP-запрос HEAD позволяет получить заголовки без тела ответа.",
      "en": "An HTTP HEAD request retrieves headers without the response body."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc9110.txt"
  },
  {
    "id": "fact-0447",
    "text": {
      "ru": "HTTP позволяет сообщать, что содержимое не изменилось, кодом 304.",
      "en": "HTTP can report unchanged content using status 304."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc9110.txt"
  },
  {
    "id": "fact-0448",
    "text": {
      "ru": "Base64 — кодирование данных, а не шифрование.",
      "en": "Base64 is data encoding, not encryption."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc4648.txt"
  },
  {
    "id": "fact-0449",
    "text": {
      "ru": "Base64 превращает бинарные данные в текстовые символы.",
      "en": "Base64 turns binary data into text characters."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc4648.txt"
  },
  {
    "id": "fact-0450",
    "text": {
      "ru": "Алфавит Base64 использует 64 основных символа.",
      "en": "Base64 uses an alphabet of 64 main characters."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc4648.txt"
  },
  {
    "id": "fact-0451",
    "text": {
      "ru": "Знак «=» в конце Base64 может служить заполнителем.",
      "en": "An equals sign at the end of Base64 can serve as padding."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc4648.txt"
  },
  {
    "id": "fact-0452",
    "text": {
      "ru": "JSON расшифровывается как JavaScript Object Notation.",
      "en": "JSON stands for JavaScript Object Notation."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc8259.txt"
  },
  {
    "id": "fact-0453",
    "text": {
      "ru": "Несмотря на название, JSON используется далеко за пределами JavaScript.",
      "en": "Despite its name, JSON is used far beyond JavaScript."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc8259.txt"
  },
  {
    "id": "fact-0454",
    "text": {
      "ru": "Стандартный JSON не поддерживает комментарии.",
      "en": "Standard JSON does not support comments."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc8259.txt"
  },
  {
    "id": "fact-0455",
    "text": {
      "ru": "Объекты JSON используют строковые имена свойств в двойных кавычках.",
      "en": "JSON objects use double-quoted string property names."
    },
    "source": "https://www.rfc-editor.org/rfc/rfc8259.txt"
  },
  {
    "id": "fact-0456",
    "text": {
      "ru": "CSS расшифровывается как Cascading Style Sheets — «каскадные таблицы стилей».",
      "en": "CSS stands for Cascading Style Sheets."
    },
    "source": "https://www.w3.org/Style/CSS/Overview.en.html"
  },
  {
    "id": "fact-0457",
    "text": {
      "ru": "CSS позволяет менять оформление страницы, не переписывая её текстовое содержимое.",
      "en": "CSS can change a page’s appearance without rewriting its text content."
    },
    "source": "https://www.w3.org/Style/CSS/Overview.en.html"
  },
  {
    "id": "fact-0458",
    "text": {
      "ru": "Шрифты, цвета и отступы веб-страницы могут задаваться отдельно с помощью CSS.",
      "en": "A webpage’s fonts, colours and spacing can be specified separately using CSS."
    },
    "source": "https://www.w3.org/Style/CSS/Overview.en.html"
  },
  {
    "id": "fact-0459",
    "text": {
      "ru": "CSS развивается в виде модулей, посвящённых разным возможностям оформления.",
      "en": "CSS evolves through modules dedicated to different styling capabilities."
    },
    "source": "https://www.w3.org/Style/CSS/Overview.en.html"
  },
  {
    "id": "fact-0460",
    "text": {
      "ru": "Первая веб-страница была посвящена самому проекту Всемирной паутины.",
      "en": "The first website was about the World Wide Web project itself."
    },
    "source": "https://info.cern.ch/"
  },
  {
    "id": "fact-0461",
    "text": {
      "ru": "Первый веб-сервер работал на компьютере NeXT в CERN.",
      "en": "The first web server ran on a NeXT computer at CERN."
    },
    "source": "https://info.cern.ch/"
  },
  {
    "id": "fact-0462",
    "text": {
      "ru": "На первом веб-сервере была наклейка с просьбой не выключать компьютер.",
      "en": "The first web server carried a label asking people not to switch it off."
    },
    "source": "https://info.cern.ch/"
  },
  {
    "id": "fact-0463",
    "text": {
      "ru": "Исторический первый сайт можно посетить по адресу info.cern.ch.",
      "en": "The historic first website can be visited at info.cern.ch."
    },
    "source": "https://info.cern.ch/"
  },
  {
    "id": "fact-0464",
    "text": {
      "ru": "Гигантские секвойи — крупнейшие деревья по объёму ствола.",
      "en": "Giant sequoias are the largest trees by trunk volume."
    },
    "source": "https://www.nps.gov/seki/learn/nature/bigtrees.htm"
  },
  {
    "id": "fact-0465",
    "text": {
      "ru": "Некоторым гигантским секвойям больше трёх тысяч лет.",
      "en": "Some giant sequoias are more than three thousand years old."
    },
    "source": "https://www.nps.gov/seki/learn/nature/bigtrees.htm"
  },
  {
    "id": "fact-0466",
    "text": {
      "ru": "Гигантские секвойи естественно растут на западных склонах Сьерра-Невады.",
      "en": "Giant sequoias naturally grow on the western slopes of the Sierra Nevada."
    },
    "source": "https://www.nps.gov/seki/learn/nature/bigtrees.htm"
  },
  {
    "id": "fact-0467",
    "text": {
      "ru": "Толстая кора гигантской секвойи помогает переживать низовые пожары.",
      "en": "A giant sequoia’s thick bark helps it survive low-intensity fires."
    },
    "source": "https://www.nps.gov/seki/learn/nature/bigtrees.htm"
  },
  {
    "id": "fact-0468",
    "text": {
      "ru": "По кольцам старых секвой исследуют климат далёкого прошлого.",
      "en": "Old sequoia rings help researchers study past climates."
    },
    "source": "https://www.nps.gov/seki/learn/nature/bigtrees.htm"
  },
  {
    "id": "fact-0469",
    "text": {
      "ru": "Чёрные подпалины на стволе секвойи могут быть следами пережитых пожаров.",
      "en": "Blackened marks on a sequoia trunk can record fires it survived."
    },
    "source": "https://www.nps.gov/seki/learn/nature/bigtrees.htm"
  },
  {
    "id": "fact-0470",
    "text": {
      "ru": "Кора гигантской секвойи толстая и губчатая на ощупь.",
      "en": "Giant sequoia bark is thick and spongy to the touch."
    },
    "source": "https://www.nps.gov/seki/learn/nature/bigtrees.htm"
  },
  {
    "id": "fact-0471",
    "text": {
      "ru": "Гигантская секвойя и прибрежная секвойя — разные виды деревьев.",
      "en": "Giant sequoia and coast redwood are different tree species."
    },
    "source": "https://www.nps.gov/seki/learn/nature/bigtrees.htm"
  },
  {
    "id": "fact-0472",
    "text": {
      "ru": "Прибрежные секвойи могут вырастать выше ста метров.",
      "en": "Coast redwoods can grow taller than a hundred metres."
    },
    "source": "https://www.nps.gov/redw/learn/nature/about-the-trees.htm"
  },
  {
    "id": "fact-0473",
    "text": {
      "ru": "Огромная прибрежная секвойя вырастает из семени размером примерно с томатное.",
      "en": "A huge coast redwood grows from a seed roughly the size of a tomato seed."
    },
    "source": "https://www.nps.gov/redw/learn/nature/about-the-trees.htm"
  },
  {
    "id": "fact-0474",
    "text": {
      "ru": "Родственники современных секвой росли ещё в юрском периоде.",
      "en": "Relatives of modern redwoods grew during the Jurassic period."
    },
    "source": "https://www.nps.gov/redw/learn/nature/about-the-trees.htm"
  },
  {
    "id": "fact-0475",
    "text": {
      "ru": "Прохладный влажный воздух тихоокеанского побережья помогает секвойям переживать сухое лето.",
      "en": "Cool, moist Pacific coastal air helps redwoods endure dry summers."
    },
    "source": "https://www.nps.gov/redw/learn/nature/about-the-trees.htm"
  },
  {
    "id": "fact-0476",
    "text": {
      "ru": "Секвойи могут достигать возраста около двух тысяч лет.",
      "en": "Coast redwoods can reach roughly two thousand years of age."
    },
    "source": "https://www.nps.gov/redw/learn/nature/about-the-trees.htm"
  },
  {
    "id": "fact-0477",
    "text": {
      "ru": "Танины в древесине секвой помогают защищаться от насекомых.",
      "en": "Tannins in redwood timber help protect it from insects."
    },
    "source": "https://www.nps.gov/redw/learn/nature/about-the-trees.htm"
  },
  {
    "id": "fact-0478",
    "text": {
      "ru": "Прибрежные секвойи могут давать новые побеги от основания ствола.",
      "en": "Coast redwoods can grow new shoots from the base of the trunk."
    },
    "source": "https://www.nps.gov/redw/learn/nature/about-the-trees.htm"
  },
  {
    "id": "fact-0479",
    "text": {
      "ru": "Прибрежная секвойя — вечнозелёное дерево.",
      "en": "The coast redwood is an evergreen tree."
    },
    "source": "https://www.nps.gov/redw/learn/nature/about-the-trees.htm"
  },
  {
    "id": "fact-0480",
    "text": {
      "ru": "Кактус сагуаро естественно растёт только в пустыне Сонора.",
      "en": "The saguaro cactus grows naturally only in the Sonoran Desert."
    },
    "source": "https://www.nps.gov/sagu/learn/nature/saguaro.htm"
  },
  {
    "id": "fact-0481",
    "text": {
      "ru": "В первые десять лет сагуаро может вырасти всего на несколько дюймов.",
      "en": "In its first ten years, a saguaro may grow only a few inches."
    },
    "source": "https://www.nps.gov/sagu/learn/nature/saguaro.htm"
  },
  {
    "id": "fact-0482",
    "text": {
      "ru": "Молодые сагуаро часто растут в тени «дерева-няньки».",
      "en": "Young saguaros often grow in the shade of a “nurse tree.”"
    },
    "source": "https://www.nps.gov/sagu/learn/nature/saguaro.htm"
  },
  {
    "id": "fact-0483",
    "text": {
      "ru": "Складки стебля сагуаро позволяют ему расширяться после дождя.",
      "en": "Pleats in a saguaro’s stem let it expand after rain."
    },
    "source": "https://www.nps.gov/sagu/learn/nature/saguaro.htm"
  },
  {
    "id": "fact-0484",
    "text": {
      "ru": "Сагуаро может много десятилетий расти без боковых «рук».",
      "en": "A saguaro can grow for many decades without side “arms.”"
    },
    "source": "https://www.nps.gov/sagu/learn/nature/saguaro.htm"
  },
  {
    "id": "fact-0485",
    "text": {
      "ru": "Цветки сагуаро открываются ночью и могут оставаться открытыми утром.",
      "en": "Saguaro flowers open at night and may remain open into the morning."
    },
    "source": "https://www.nps.gov/sagu/learn/nature/saguaro.htm"
  },
  {
    "id": "fact-0486",
    "text": {
      "ru": "Плоды сагуаро служат пищей многим пустынным животным.",
      "en": "Saguaro fruit feeds many desert animals."
    },
    "source": "https://www.nps.gov/sagu/learn/nature/saguaro.htm"
  },
  {
    "id": "fact-0487",
    "text": {
      "ru": "Сильные морозы ограничивают область распространения сагуаро.",
      "en": "Severe freezing limits where saguaros can grow."
    },
    "source": "https://www.nps.gov/sagu/learn/nature/saguaro.htm"
  },
  {
    "id": "fact-0488",
    "text": {
      "ru": "Дерево Джошуа — вид юкки, а не обычное ветвистое дерево.",
      "en": "The Joshua tree is a yucca species, not a conventional branching tree."
    },
    "source": "https://www.nps.gov/jotr/learn/nature/jtrees.htm"
  },
  {
    "id": "fact-0489",
    "text": {
      "ru": "Дерево Джошуа относится к однодольным, как травы и орхидеи.",
      "en": "The Joshua tree is a monocot, like grasses and orchids."
    },
    "source": "https://www.nps.gov/jotr/learn/nature/jtrees.htm"
  },
  {
    "id": "fact-0490",
    "text": {
      "ru": "Дерево Джошуа — один из символов пустыни Мохаве.",
      "en": "The Joshua tree is an emblem of the Mojave Desert."
    },
    "source": "https://www.nps.gov/jotr/learn/nature/jtrees.htm"
  },
  {
    "id": "fact-0491",
    "text": {
      "ru": "Юкковая моль опыляет дерево Джошуа, одновременно откладывая яйца в его цветок.",
      "en": "A yucca moth pollinates a Joshua tree while laying eggs in its flower."
    },
    "source": "https://www.nps.gov/jotr/learn/nature/jtrees.htm"
  },
  {
    "id": "fact-0492",
    "text": {
      "ru": "У дерева Джошуа нет привычных годичных колец, как у многих других деревьев.",
      "en": "Joshua trees lack the familiar annual rings found in many other trees."
    },
    "source": "https://www.nps.gov/jotr/learn/nature/jtrees.htm"
  },
  {
    "id": "fact-0493",
    "text": {
      "ru": "Из жёстких листьев дерева Джошуа коренные народы плели корзины и сандалии.",
      "en": "Indigenous people wove Joshua tree leaves into baskets and sandals."
    },
    "source": "https://www.nps.gov/jotr/learn/nature/jtrees.htm"
  },
  {
    "id": "fact-0494",
    "text": {
      "ru": "Цветение дерева Джошуа зависит от подходящего сочетания погоды и осадков.",
      "en": "Joshua tree flowering depends on a suitable combination of weather and rainfall."
    },
    "source": "https://www.nps.gov/jotr/learn/nature/jtrees.htm"
  },
  {
    "id": "fact-0495",
    "text": {
      "ru": "Птицы и другие животные используют дерево Джошуа как место для жизни и укрытия.",
      "en": "Birds and other animals use Joshua trees for homes and shelter."
    },
    "source": "https://www.nps.gov/jotr/learn/nature/jtrees.htm"
  },
  {
    "id": "fact-0496",
    "text": {
      "ru": "Карстовый ландшафт образуется там, где вода растворяет горную породу.",
      "en": "Karst landscapes form where water dissolves bedrock."
    },
    "source": "https://www.nps.gov/subjects/caves/karst-landscapes.htm"
  },
  {
    "id": "fact-0497",
    "text": {
      "ru": "Известняк — одна из пород, в которых часто развивается карст.",
      "en": "Limestone is one of the rocks in which karst commonly develops."
    },
    "source": "https://www.nps.gov/subjects/caves/karst-landscapes.htm"
  },
  {
    "id": "fact-0498",
    "text": {
      "ru": "Карстовые процессы могут происходить и в гипсе.",
      "en": "Karst processes can also occur in gypsum."
    },
    "source": "https://www.nps.gov/subjects/caves/karst-landscapes.htm"
  },
  {
    "id": "fact-0499",
    "text": {
      "ru": "В карстовом ландшафте ручей может исчезнуть под землёй.",
      "en": "In a karst landscape, a stream can disappear underground."
    },
    "source": "https://www.nps.gov/subjects/caves/karst-landscapes.htm"
  },
  {
    "id": "fact-0500",
    "text": {
      "ru": "Подземная карстовая вода может снова выходить на поверхность родником.",
      "en": "Underground karst water can reappear at the surface as a spring."
    },
    "source": "https://www.nps.gov/subjects/caves/karst-landscapes.htm"
  },
  {
    "id": "fact-0501",
    "text": {
      "ru": "Некоторые провалы на поверхности связаны с растворением породы или обрушением пещер.",
      "en": "Some surface sinkholes form through rock dissolution or cave collapse."
    },
    "source": "https://www.nps.gov/subjects/caves/karst-landscapes.htm"
  },
  {
    "id": "fact-0502",
    "text": {
      "ru": "Карстовые системы могут хранить большие запасы подземной воды.",
      "en": "Karst systems can store large amounts of groundwater."
    },
    "source": "https://www.nps.gov/subjects/caves/karst-landscapes.htm"
  },
  {
    "id": "fact-0503",
    "text": {
      "ru": "В карстовой системе загрязнения могут быстро переноситься под землёй.",
      "en": "Pollutants can move quickly underground through a karst system."
    },
    "source": "https://www.nps.gov/subjects/caves/karst-landscapes.htm"
  }
] satisfies readonly Fact[];
