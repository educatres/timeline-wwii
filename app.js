const stage = document.querySelector('#stage');
const slider = document.querySelector('#yearSlider');
const yearLabel = document.querySelector('#yearLabel');
const eraLabel = document.querySelector('#eraLabel');
const snapshotYear = document.querySelector('#snapshotYear');
const snapshotCards = document.querySelector('#snapshotCards');
const question = document.querySelector('#thinkingQuestion');

const YEAR_START = 1915;
const YEAR_END = 1975;
const YEAR_CENTER = 1945;
const YEAR_SPACING = 74;
const LANE_EDGE = 80;

let currentYear = YEAR_CENTER;
let dragging = false;
let startX = 0;
let startYear = YEAR_CENTER;

const typeNames = {
  event: '重大事件',
  leader: '政治領導人',
  economy: '政經議題',
  person: '重要人物'
};

const typeColors = {
  event: 'var(--event)',
  leader: 'var(--leader)',
  economy: 'var(--economy)',
  person: 'var(--person)'
};

function era(year) {
  if (year < 1919) return '第一次世界大戰與革命';
  if (year < 1929) return '戰後重建、民族運動與新秩序';
  if (year < 1939) return '戰前危機累積';
  if (year < 1943) return '全面戰爭擴張';
  if (year < 1946) return '戰局逆轉與戰爭終結';
  if (year < 1950) return '重建、分裂與冷戰成形';
  if (year < 1956) return '冷戰全球化與去殖民化';
  if (year < 1965) return '核危機、圍牆與新興國家';
  return '社會運動、戰爭終結與緩和';
}

function build() {
  const world = document.createElement('div');
  world.className = 'world';

  Object.entries(REGIONS).forEach(([key, region]) => {
    const lane = document.createElement('section');
    lane.className = `lane ${key}`;
    lane.setAttribute('aria-label', region.name);
    lane.innerHTML = '<div class="axis"></div>';

    for (let year = YEAR_START; year <= YEAR_END; year += 1) {
      const mark = document.createElement('div');
      mark.className = 'year-mark';
      mark.style.left = `${LANE_EDGE + (year - YEAR_START) * YEAR_SPACING}px`;
      if (year % 5 === 0) mark.innerHTML = `<span>${year}</span>`;
      lane.append(mark);
    }

    const regionEvents = EVENTS
      .filter((event) => event.region === key)
      .sort((a, b) => a.year - b.year || a.id.localeCompare(b.id));

    const eventsPerYear = regionEvents.reduce((counts, event) => {
      counts.set(event.year, (counts.get(event.year) || 0) + 1);
      return counts;
    }, new Map());
    const yearOccurrences = new Map();

    regionEvents.forEach((event, index) => {
      const occurrence = yearOccurrences.get(event.year) || 0;
      const sameYearCount = eventsPerYear.get(event.year);
      const duplicateOffset = sameYearCount > 1
        ? (occurrence - (sameYearCount - 1) / 2) * 180
        : 0;
      yearOccurrences.set(event.year, occurrence + 1);

      const card = document.createElement('button');
      card.className = `event-card slot-${index % 2}`;
      card.dataset.id = event.id;
      card.style.left = `${LANE_EDGE + (event.year - YEAR_START) * YEAR_SPACING + duplicateOffset}px`;
      card.style.setProperty('--type', typeColors[event.type]);
      card.setAttribute('aria-label', `${event.date}，${event.title}，開啟詳細資料`);
      card.innerHTML = `
        <span class="date">${event.date} · ${typeNames[event.type]}</span>
        <b>${event.title}</b>
      `;
      card.addEventListener('pointerdown', (eventPointer) => eventPointer.stopPropagation());
      card.addEventListener('click', (eventClick) => {
        eventClick.stopPropagation();
        openDetails(event);
      });
      lane.append(card);
    });

    world.append(lane);
  });

  world.insertAdjacentHTML('beforeend', '<div class="focus-beam"></div>');
  stage.append(world);
}

function setYear(year) {
  currentYear = Math.max(YEAR_START, Math.min(YEAR_END, Math.round(year)));
  slider.value = currentYear;
  yearLabel.textContent = currentYear;
  eraLabel.textContent = era(currentYear);
  snapshotYear.textContent = currentYear;
  document.querySelector('.world').style.left = `${-(currentYear - YEAR_CENTER) * YEAR_SPACING}px`;

  document.querySelectorAll('.event-card').forEach((card) => {
    const event = EVENTS.find((item) => item.id === card.dataset.id);
    const distance = Math.abs(event.year - currentYear);
    card.classList.toggle('near', distance === 0);
    card.classList.toggle('far', distance > 3);
  });

  renderSnapshot();
  question.textContent = QUESTIONS[currentYear]
    || `請找出距離 ${currentYear} 最近的三洲事件，推測它們之間可能存在的因果或連動關係。`;
}

function nearest(region) {
  return EVENTS
    .filter((event) => event.region === region)
    .sort((a, b) => Math.abs(a.year - currentYear) - Math.abs(b.year - currentYear))[0];
}

function renderSnapshot() {
  snapshotCards.innerHTML = '';
  Object.keys(REGIONS).forEach((key) => {
    const exact = EVENTS.filter((event) => event.region === key && event.year === currentYear);
    const items = exact.length ? exact : [nearest(key)];
    const card = document.createElement('article');
    card.className = `snapshot ${exact.length ? '' : 'empty'}`;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.innerHTML = `
      <div class="region">${REGIONS[key].icon} ${REGIONS[key].name}${exact.length ? '' : ` · 鄰近 ${items[0].year}`}</div>
      ${items.slice(0, 2).map((event) => `<h3>${event.title}</h3><p>${event.summary}</p>`).join('')}
    `;
    const open = () => openDetails(items[0]);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
    snapshotCards.append(card);
  });
}

const detailPanel = document.querySelector('#detailPanel');
const detailGallery = document.querySelector('#detailGallery');
const detailVideos = document.querySelector('#detailVideos');
const detailSources = document.querySelector('#detailSources');

function commonsImageUrl(file) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1100`;
}

function commonsSourceUrl(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
}

function sourceName(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '主要資料來源';
  }
}

function openDetails(event) {
  document.querySelector('#detailRegion').textContent = `${REGIONS[event.region].icon}｜${REGIONS[event.region].name}`;
  document.querySelector('#detailType').textContent = typeNames[event.type];
  document.querySelector('#detailDate').textContent = event.date;
  document.querySelector('#detailTitle').textContent = event.title;
  document.querySelector('#detailSummary').textContent = event.summary;
  document.querySelector('#detailText').textContent = event.details || event.context;
  document.querySelector('#detailContext').textContent = event.context;
  document.querySelector('#detailImpact').textContent = event.impact;

  const leaders = document.querySelector('#detailLeaders');
  leaders.innerHTML = '';
  event.leaders.forEach((leader) => {
    const chip = document.createElement('span');
    chip.textContent = leader;
    leaders.append(chip);
  });

  detailGallery.innerHTML = '';
  (event.images || []).forEach(([file, caption]) => {
    const figure = document.createElement('figure');
    const link = document.createElement('a');
    const image = document.createElement('img');
    const figureCaption = document.createElement('figcaption');
    const sourceLink = document.createElement('a');

    link.href = commonsSourceUrl(file);
    link.target = '_blank';
    link.rel = 'noopener';
    link.title = '前往 Wikimedia Commons 原始檔案頁';
    image.src = commonsImageUrl(file);
    image.alt = caption;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', () => figure.classList.add('image-error'));
    link.append(image);

    figureCaption.append(document.createTextNode(caption));
    sourceLink.href = commonsSourceUrl(file);
    sourceLink.target = '_blank';
    sourceLink.rel = 'noopener';
    sourceLink.textContent = 'Wikimedia Commons 原圖與授權 ↗';
    figureCaption.append(sourceLink);
    figure.append(link, figureCaption);
    detailGallery.append(figure);
  });

  detailVideos.innerHTML = '';
  (event.videos || []).forEach((video) => {
    const article = document.createElement('article');
    const frame = document.createElement('iframe');
    const title = document.createElement('a');
    const source = document.createElement('p');
    const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

    article.className = 'video-card';
    frame.src = `https://www.youtube-nocookie.com/embed/${video.id}`;
    frame.title = video.title;
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    title.href = watchUrl;
    title.target = '_blank';
    title.rel = 'noopener';
    title.textContent = `${video.title} ↗`;
    source.textContent = `出處：${video.channel}｜YouTube`;
    article.append(frame, title, source);
    detailVideos.append(article);
  });

  detailSources.innerHTML = '';
  const sources = [
    {
      label: `事件資料：${sourceName(event.source)}`,
      url: event.source
    },
    ...(event.images || []).map(([file, caption], index) => ({
      label: `圖像 ${index + 1}：${caption}`,
      url: commonsSourceUrl(file)
    })),
    ...(event.videos || []).map((video, index) => ({
      label: `影片 ${index + 1}：${video.title}（${video.channel}）`,
      url: `https://www.youtube.com/watch?v=${video.id}`
    }))
  ];

  sources.forEach((source) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = source.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = source.label;
    item.append(link);
    detailSources.append(item);
  });

  document.querySelectorAll('.event-card').forEach((card) => {
    card.classList.toggle('selected', card.dataset.id === event.id);
  });

  detailPanel.querySelector('.detail-scroll').scrollTop = 0;
}

const typeFilters = [...document.querySelectorAll('[data-type-filter]')];

function applyTypeFilters() {
  const visibleTypes = new Set(
    typeFilters.filter((filter) => filter.checked).map((filter) => filter.dataset.typeFilter)
  );
  document.querySelectorAll('.event-card').forEach((card) => {
    const event = EVENTS.find((item) => item.id === card.dataset.id);
    card.hidden = !visibleTypes.has(event.type);
  });
}

typeFilters.forEach((filter) => filter.addEventListener('change', applyTypeFilters));

slider.addEventListener('input', (event) => setYear(Number(event.target.value)));
document.querySelector('#prevYear').addEventListener('click', () => setYear(currentYear - 1));
document.querySelector('#nextYear').addEventListener('click', () => setYear(currentYear + 1));
document.querySelector('#resetBtn').addEventListener('click', () => setYear(YEAR_CENTER));

stage.addEventListener('wheel', (event) => {
  if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
  event.preventDefault();
  setYear(currentYear + (event.deltaX > 0 ? 1 : -1));
}, { passive: false });

stage.addEventListener('pointerdown', (event) => {
  dragging = true;
  startX = event.clientX;
  startYear = currentYear;
  stage.setPointerCapture(event.pointerId);
});

stage.addEventListener('pointermove', (event) => {
  if (dragging) setYear(startYear - (event.clientX - startX) / 100);
});

stage.addEventListener('pointerup', () => {
  dragging = false;
});

stage.addEventListener('pointercancel', () => {
  dragging = false;
});

stage.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') setYear(currentYear - 1);
  if (event.key === 'ArrowRight') setYear(currentYear + 1);
});

const help = document.querySelector('#helpDialog');
document.querySelector('#helpBtn').addEventListener('click', () => help.showModal());
document.querySelector('#closeHelp').addEventListener('click', () => help.close());
help.addEventListener('click', (event) => {
  if (event.target === help) help.close();
});

build();
setYear(YEAR_CENTER);
applyTypeFilters();
const initialEvent = EVENTS.find((event) => event.id === 'a1945') || EVENTS[0];
openDetails(initialEvent);
