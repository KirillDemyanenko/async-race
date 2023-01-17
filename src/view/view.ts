import {buttonCreateNewCar, buttonUpdateCar, generateOneHundredCars, redrawCarTrackWithCars, selectCar} from '../controller/controller';

class ContentGenerator {
  /* Set total page count */
  static setTotalPageCount(totalCars: string) {
    (document.querySelector('#total-pages') as HTMLInputElement).value = Math.ceil(parseInt(totalCars, 10) / 7).toString();
    (document.querySelector('#cars-counter') as HTMLLabelElement).innerText = `There are ${totalCars} cars in your garage`

  }

  /* Load data in update form */
  static setDataInUpdateForm(carName: string, color: string): void {
    const form = Array.from((document.querySelector('#update-car') as ParentNode)?.children);
    (form[0].lastChild as HTMLInputElement).value = carName;
    (form[1].lastChild as HTMLInputElement).value = color;

  }

  /* Enable update form */
  static enableUpdateForm(): void {
    const form = Array.from((document.querySelector('#update-car') as ParentNode)?.children);
    (form[0].lastChild as HTMLElement).removeAttribute('disabled');
    (form[1].lastChild as HTMLElement)
        .removeAttribute('disabled');
    (form[2] as HTMLElement)
        .removeAttribute('disabled');
  }

  /* Disabled update form */
  static disableUpdateForm(): void {
    const form = Array.from((document.querySelector('#update-car') as ParentNode)?.children);
    (form[0].lastChild as HTMLInputElement).setAttribute('disabled', 'true');
    (form[0].lastChild as HTMLInputElement).value = '';
    (form[1].lastChild as HTMLInputElement)
      .setAttribute('disabled', 'true');
    (form[1].lastChild as HTMLInputElement).value = '#000000';
    (form[2] as HTMLElement)
      .setAttribute('disabled', 'true');
  }

  /* Generates a footer for the site */
  static generateFooter(): void {
    const footer = document.createElement('footer');
    let button = document.createElement('button');
    const div = document.createElement('div');
    let input = document.createElement('input');
    const p = document.createElement('p');
    button.classList.add('back__btn');
    button.innerText = 'previous page';
    button.addEventListener('click', async () => {
      const currenPage: number = parseInt((document.querySelector('#current-page') as HTMLInputElement).value, 10);
      if ( currenPage - 1 > 0) {
        await redrawCarTrackWithCars(currenPage - 1);
        (document.querySelector('#current-page') as HTMLInputElement).value = `${currenPage - 1}`
      }
    })
    footer.append(button);
    div.classList.add('page-counter');
    input.setAttribute('type', 'number');
    input.setAttribute('required', 'true');
    input.setAttribute('value', '1');
    input.id = 'current-page';
    input.value = '1';
    div.append(input);
    p.innerText = '/';
    div.append(p);
    div.classList.add('page-counter');
    input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('readonly', 'true');
    input.id = 'total-pages';
    div.append(input);
    footer.append(div);
    button = document.createElement('button');
    button.classList.add('forward__btn');
    button.innerText = 'next page';
    button.addEventListener('click', async () => {
      const currenPage: number = parseInt((document.querySelector('#current-page') as HTMLInputElement).value, 10);
      if ( currenPage + 1 <= parseInt((document.querySelector('#total-pages') as HTMLInputElement).value, 10)) {
        await redrawCarTrackWithCars(currenPage + 1);
        (document.querySelector('#current-page') as HTMLInputElement).value = `${currenPage + 1}`
      }
    })
    footer.append(button);
    document.body.append(footer);
    this.disableUpdateForm();
  }

  /* Generates a section for the main */
  static generateSectionCarManagement(): HTMLElement {
    const section = document.createElement('section');
    section.classList.add('car-management');
    for (let i = 0; i < 2; i += 1) {
      const form = document.createElement('form');
      const button = document.createElement('button');
      button.innerText = i ? 'update car' : 'create car';
      button.addEventListener('click', (ev) => {
        ev.preventDefault();
        if ((ev.target as HTMLElement).innerText.includes('CREATE')) {
          buttonCreateNewCar((ev.target as HTMLElement).parentNode as ParentNode)
            .then(() => console.log('Car successfully created'));
        } else {
          buttonUpdateCar((ev.target as HTMLElement).parentNode as ParentNode).then(() => console.log('Car successfully updated'));
        }
      });
      form.id = i ? 'update-car' : 'create-car';
      for (let j = 0; j < 2; j += 1) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        label.innerText = j ? 'Choose car color' : 'Car model';
        input.type = j ? 'color' : 'text';
        input.placeholder = j ? '' : 'Input car name here';
        button.id = j ? 'update-car__btn' : 'create-car__btn';
        label.append(input);
        form.append(label);
        form.append(button);
      }
      form.append(button);
      section.append(form);
    }
    let div = document.createElement('div');
    div.classList.add('generate-cars');
    const label = document.createElement('label');
    label.id = 'cars-counter'
    label.innerText = 'There are 0 cars in your garage'
    div.append(label)
    let button = document.createElement('button');
    button.id = 'generate-car__btn';
    button.addEventListener('click', async () => {
      await generateOneHundredCars();
    });
    button.innerText = 'generate 100 cars automatically';
    div.append(button);
    section.append(div);
    div = document.createElement('div');
    div.classList.add('race-management');
    for (let i = 0; i < 2; i += 1) {
      button = document.createElement('button');
      button.id = i ? 'reset__btn' : 'start__btn';
      button.innerText = i ? 'reset race' : 'start race';
      div.append(button);
    }
    section.append(div);
    return section;
  }

  /* Generates a section racetrack for the main */
  static generateRaceTrack(): HTMLElement {
    const section = document.createElement('section');
    section.classList.add('race-track');
    for (let i = 0; i <= 6; i += 1) {
      const div = document.createElement('div');
      div.classList.add('car-track');
      div.id = `track-${i}`;
      section.append(div);
    }
    return section
  }

  /* Generates a main for the site */
  static generateMain(): void {
    const main = document.createElement('main');
    main.append(this.generateSectionCarManagement());
    main.append(this.generateRaceTrack());
    document.body.append(main);
    this.generateFooter();
  }

  /* Generates a header for the site */
  static generateHeader(): void {
    const headerMenu = ['garage', 'winners'];
    const header = document.createElement('header');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const h1 = document.createElement('h1');
    const ul = document.createElement('ul');
    img.setAttribute('src', './assets/logo.png');
    img.setAttribute('alt', 'Async race');
    a.append(img);
    a.setAttribute('href', '/');
    h1.innerText = 'async race';
    a.append(h1);
    header.append(a);
    for (let i = 0; i < 2; i += 1) {
      const li = document.createElement('li');
      li.innerText = headerMenu[i];
      ul.append(li);
    }
    header.append(ul);
    document.body.append(header);
    this.generateMain();
  }

  /* Generates svg image of the car and places it on the desired track */
  static drawCar(color: string, track: number, carName: string, catId: number) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    const g = document.createElementNS(ns, 'g');
    const label = document.createElementNS(ns, 'text');
    let ellipse = document.createElementNS(ns, 'ellipse')
    // const text = document.createElementNS(ns, 'text')
    ellipse.setAttribute('cx','-150')
    ellipse.setAttribute('cy','600')
    ellipse.setAttribute('fill','#FF0000')
    ellipse.setAttribute('rx','150')
    ellipse.setAttribute('ry','150')
    ellipse.setAttribute('stroke','#ffffff')
    ellipse.setAttribute('stroke-width','10')
    ellipse.addEventListener('click', () => console.log('STOP'))
    svg.append(ellipse)
    ellipse = document.createElementNS(ns, 'ellipse')
    ellipse.setAttribute('cx','-150')
    ellipse.setAttribute('cy','300')
    ellipse.setAttribute('fill','#0d5001')
    ellipse.setAttribute('rx','150')
    ellipse.setAttribute('ry','150')
    ellipse.setAttribute('stroke','#ffffff')
    ellipse.setAttribute('stroke-width','10')
    ellipse.addEventListener('click', () => console.log('START'))
    svg.append(ellipse)
    // text.setAttribute('fill','#000000')
    // text.setAttribute('font-family','serif')
    // text.setAttribute('font-size','24')
    // text.textContent = 'STOP'
    svg.append(ellipse)
    // svg.append(text)
    // <text fill="#000000" font-family="serif" font-size="24" id="svg_3" stroke="#000000" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" style="cursor: move;" text-anchor="middle" x="204.1" xml:space="preserve" y="175.7">STOP</text>
    label.setAttribute('font-family', 'Verdana');
    label.setAttribute('font-size', '200px');
    label.setAttribute('fill', 'white');
    // label.setAttribute("x", '600px');
    label.setAttribute('y', '200px');
    label.setAttribute('text-anchor', 'start');
    label.textContent = carName;
    svg.setAttribute('width', '140px');
    svg.setAttribute('id', `svg-${catId}`);
    svg.setAttribute('height', '60px');
    svg.setAttribute('viewBox', '0 0 1280.000000 867.000000');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    g.setAttribute('transform', 'translate(0.000000,867.000000) scale(0.100000,-0.10000)');
    g.setAttribute('fill', color);
    g.setAttribute('stroke', 'none');
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', 'M6201 5679 c-569 -30 -1155 -158 -1689 -370 -426 -170 -836 -397\n'
            + '-1252 -693 l-115 -82 -121 4 -120 4 -34 62 c-56 101 -184 286 -260 374 -40 46\n'
            + '-108 112 -151 145 -69 55 -79 66 -79 95 0 41 -35 62 -75 44 -53 -24 -12 -115\n'
            + '44 -97 37 11 243 -205 361 -380 49 -73 120 -209 120 -230 0 -7 -125 -11 -372\n'
            + '-12 -322 -2 -816 -18 -825 -27 -2 -1 6 -29 17 -61 11 -32 20 -62 20 -66 0 -5\n'
            + '-18 -12 -41 -15 -51 -8 -103 -43 -107 -72 -4 -24 40 -56 91 -68 l29 -6 -31\n'
            + '-19 c-52 -32 -33 -77 44 -103 l36 -13 -25 -17 c-54 -35 -22 -79 76 -105 l63\n'
            + '-16 33 -108 34 -107 -47 -52 c-96 -107 -130 -198 -100 -262 33 -70 2 -67 612\n'
            + '-56 301 5 640 12 753 15 113 2 217 5 233 5 22 0 27 4 27 26 0 92 60 182 135\n'
            + '203 45 12 265 15 265 3 0 -4 -16 -16 -35 -26 -50 -27 -132 -117 -158 -173 -18\n'
            + '-39 -22 -66 -22 -143 0 -109 15 -148 82 -212 61 -59 124 -83 218 -83 71 0 89\n'
            + '4 148 33 36 18 88 54 113 80 106 106 140 264 81 384 -15 31 -44 71 -64 89\n'
            + 'l-37 32 59 -6 c33 -4 95 -10 139 -13 l78 -7 29 -45 c34 -53 39 -133 13 -183\n'
            + '-8 -17 -13 -33 -10 -36 3 -3 851 -1 1883 6 1033 6 2063 11 2288 11 l410 0 0\n'
            + '108 c0 95 3 113 27 164 34 72 95 131 166 160 52 21 72 23 217 22 140 -1 173\n'
            + '-4 259 -27 306 -82 489 -263 474 -468 -2 -33 -4 -59 -4 -60 2 -2 581 -56 584\n'
            + '-54 2 1 -9 70 -23 153 -14 83 -32 215 -40 294 l-15 144 133 278 132 279 93 48\n'
            + 'c185 95 295 217 310 344 l5 45 -459 0 c-892 0 -1880 -58 -2699 -158 l-140 -17\n'
            + '-140 79 c-77 43 -146 85 -153 91 -12 11 -8 27 22 96 20 45 35 83 33 85 -3 3\n'
            + '-325 -370 -322 -374 2 -2 48 26 103 62 l101 65 108 -45 c59 -25 119 -50 132\n'
            + '-55 13 -5 22 -11 20 -13 -2 -2 -116 -21 -254 -41 -931 -136 -1744 -339 -2367\n'
            + '-591 -87 -35 -161 -64 -163 -64 -2 0 -13 21 -25 47 -66 150 -280 294 -590 396\n'
            + '-74 25 -150 48 -168 52 -37 8 -37 7 2 105 32 82 88 160 170 238 313 297 927\n'
            + '493 1816 581 365 36 497 43 991 48 l486 6 257 -349 c142 -192 263 -353 268\n'
            + '-359 5 -5 2 8 -7 30 -9 22 -67 166 -130 320 -62 154 -121 297 -130 319 l-16\n'
            + '39 123 -7 c68 -4 152 -9 188 -11 l65 -5 -40 20 c-60 29 -351 124 -505 164\n'
            + '-535 137 -1102 194 -1659 165z M6214 4866 l-21 -15 38 -202 c21 -112 38 -204 36 -205 -1 -1 -372\n'
            + '-28 -824 -60 -452 -32 -820 -60 -818 -62 2 -2 39 -16 82 -31 177 -59 314 -168\n'
            + '376 -299 l34 -70 44 20 c80 36 461 175 634 231 450 147 937 265 1313 318 46 6\n'
            + '82 13 80 14 -2 2 -116 -5 -253 -15 -138 -10 -277 -20 -310 -21 l-59 -3 -78\n'
            + '199 c-43 109 -80 201 -84 204 -3 3 -42 7 -87 9 -61 2 -87 -1 -103 -12z M9508 3631 c-74 -24'
            + ' -116 -51 -166 -105 -63 -68 -94 -139 -100 -222\n'
            + '-6 -93 15 -158 73 -222 62 -69 127 -96 230 -96 69 -1 89 4 147 31 220 103 294\n'
            + '370 149 536 -73 83 -216 117 -333 78z');
    path.addEventListener('click', async () => {
      try {
        await selectCar(catId)
      }
      catch (error) {
        console.log(error);
      }
    })
    g.append(path);
    svg.append(g);
    svg.append(label);
    document.querySelector(`#track-${track}`)
      ?.append(svg);
  }
}

export default ContentGenerator;
