/* =========================================================
   GYEP — Portfolio / Showcase data
   Replace image paths + project copy when real work/assets are ready.
========================================================= */
(() => {
  const projects = [
    {
      id: 'signature-figurine',
      number: '01',
      title: 'Signature Figurine',
      category: 'figurines',
      categoryLabel: 'Figurines',
      product: 'Custom Figurine',
      tag: 'People',
      image: 'assets/images/portfolio/signature-figurine.jpg',
      accent: 'dark',
      eyebrow: 'CUSTOM FIGURINE',
      intro: 'A personalized figure built around a person, a pose, and a moment worth keeping.',
      details: [
        ['Product', 'Custom Figurine'],
        ['Category', 'Figurines'],
        ['Format', 'Personalized 3D print'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'TURN A PERSON INTO A PIECE.',
      story: 'From photo reference to a physical figure, the focus is on capturing the character of the moment without making the process feel complicated.',
      steps: [
        ['01', 'Reference', 'Start from the customer photo and the details that matter.'],
        ['02', 'Design', 'Shape the figure around pose, styling, and personalization.'],
        ['03', 'Approval', 'Confirm the design before production begins.'],
        ['04', 'Print', 'Produce, quality-check, pack, and ship.']
      ]
    },
    {
      id: 'light-in-layers',
      number: '02',
      title: 'Light In Layers',
      category: 'photo-memory',
      categoryLabel: 'Photo & Memory',
      product: 'Lithophane',
      tag: 'Memories',
      image: 'assets/images/portfolio/light-in-layers.jpg',
      accent: 'light',
      eyebrow: 'LITHOPHANE',
      intro: 'A photograph translated into layers, creating a keepsake that changes with the light.',
      details: [
        ['Product', 'Lithophane'],
        ['Category', 'Photo & Memory'],
        ['Format', 'Photo-based 3D print'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'A PHOTO YOU CAN HOLD.',
      story: 'Lithophane turns a familiar image into a physical object with depth. The visual becomes especially expressive when light passes through it.',
      steps: [
        ['01', 'Select Photo', 'Choose a clear photo with useful contrast.'],
        ['02', 'Prepare', 'Convert the image into a printable layered form.'],
        ['03', 'Approve', 'Review the final preview before production.'],
        ['04', 'Produce', 'Print, check, pack, and deliver.']
      ]
    },
    {
      id: 'scan-share',
      number: '03',
      title: 'Scan & Share',
      category: 'personalized',
      categoryLabel: 'Personalized',
      product: '3D QR Code',
      tag: 'Ideas',
      image: 'assets/images/portfolio/scan-share.jpg',
      accent: 'blue',
      eyebrow: '3D QR CODE',
      intro: 'A functional code turned into a physical object for desks, counters, events, and gifts.',
      details: [
        ['Product', '3D QR Code'],
        ['Category', 'Personalized'],
        ['Format', 'Functional display object'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'MAKE THE DIGITAL PHYSICAL.',
      story: 'A QR code does not have to stay on a screen. GYEP turns a digital destination into a piece people can see, scan, and keep in a physical space.',
      steps: [
        ['01', 'Link', 'Send the URL or destination to encode.'],
        ['02', 'Design', 'Set the visual treatment and scale.'],
        ['03', 'Test', 'Confirm the generated code before production.'],
        ['04', 'Print', 'Produce and verify the finished piece.']
      ]
    },
    {
      id: 'map-the-memory',
      number: '04',
      title: 'Map The Memory',
      category: 'photo-memory',
      categoryLabel: 'Photo & Memory',
      product: '3D Map / Pinned Memories',
      tag: 'Places',
      image: 'assets/images/portfolio/map-the-memory.jpg',
      accent: 'pale',
      eyebrow: '3D MAP',
      intro: 'A place turned into a tactile reminder of where something meaningful happened.',
      details: [
        ['Product', '3D Map / Pinned Memories'],
        ['Category', 'Photo & Memory'],
        ['Format', 'Location-based keepsake'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'KEEP THE PLACE CLOSE.',
      story: 'A map can hold more than geography. It can mark a city, a first meeting, a home, a destination, or any location that deserves a physical reminder.',
      steps: [
        ['01', 'Location', 'Provide the place or coordinates to highlight.'],
        ['02', 'Compose', 'Translate the location into a clean 3D layout.'],
        ['03', 'Approve', 'Review the placement and visual direction.'],
        ['04', 'Produce', 'Print and prepare the piece for delivery.']
      ]
    },
    {
      id: 'table-top-story',
      number: '05',
      title: 'Table Top Story',
      category: 'event-souvenir',
      categoryLabel: 'Souvenir & Event',
      product: 'Cake Topper',
      tag: 'Events',
      image: 'assets/images/portfolio/table-top-story.jpg',
      accent: 'light',
      eyebrow: 'CAKE TOPPER',
      intro: 'A small detail designed to make birthdays, celebrations, and special tables feel more personal.',
      details: [
        ['Product', 'Cake Topper'],
        ['Category', 'Souvenir & Event'],
        ['Format', 'Event accessory'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'THE LITTLE DETAIL MATTERS.',
      story: 'Sometimes personalization is not about making something huge. It is about adding one piece that makes the whole occasion feel like yours.',
      steps: [
        ['01', 'Brief', 'Share the name, text, or visual direction.'],
        ['02', 'Design', 'Set the composition and production format.'],
        ['03', 'Approve', 'Confirm the artwork before printing.'],
        ['04', 'Finish', 'Produce, check, pack, and ship.']
      ]
    },
    {
      id: 'name-it-your-way',
      number: '06',
      title: 'Name It Your Way',
      category: 'personalized',
      categoryLabel: 'Personalized',
      product: 'Papan Nama',
      tag: 'Names',
      image: 'assets/images/portfolio/name-it-your-way.jpg',
      accent: 'blue',
      eyebrow: 'NAME BOARD',
      intro: 'Personalized lettering for rooms, desks, gifts, and spaces that need a little identity.',
      details: [
        ['Product', 'Papan Nama'],
        ['Category', 'Personalized'],
        ['Format', 'Custom name display'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'PUT YOUR NAME ON IT.',
      story: 'Names change the feeling of a space. A simple 3D sign can turn an ordinary desk, room, or gift into something unmistakably personal.',
      steps: [
        ['01', 'Name', 'Provide the exact spelling and preferred text.'],
        ['02', 'Style', 'Choose the visual direction available for the product.'],
        ['03', 'Approve', 'Check the final layout before production.'],
        ['04', 'Print', 'Produce and quality-check the finished piece.']
      ]
    },
    {
      id: 'sound-on-the-surface',
      number: '07',
      title: 'Sound On The Surface',
      category: 'photo-memory',
      categoryLabel: 'Photo & Memory',
      product: 'Gelombang Suara',
      tag: 'Moments',
      image: 'assets/images/portfolio/sound-on-the-surface.jpg',
      accent: 'dark',
      eyebrow: 'SOUND WAVE',
      intro: 'A meaningful phrase, laugh, or voice note transformed into a visual object.',
      details: [
        ['Product', 'Gelombang Suara'],
        ['Category', 'Photo & Memory'],
        ['Format', 'Audio-inspired keepsake'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'SOME THINGS SOUND BETTER IN 3D.',
      story: 'A sound wave turns an audio moment into a graphic form. The result is a small object that can preserve a voice-related memory in a new way.',
      steps: [
        ['01', 'Audio', 'Provide the sound reference or recording.'],
        ['02', 'Waveform', 'Translate the recording into a clean visual form.'],
        ['03', 'Approve', 'Review the final composition.'],
        ['04', 'Print', 'Produce and finish the physical piece.']
      ]
    },
    {
      id: 'desk-in-order',
      number: '08',
      title: 'Desk In Order',
      category: 'home-desk',
      categoryLabel: 'Home & Desk',
      product: 'Organizer Laci',
      tag: 'Everyday',
      image: 'assets/images/portfolio/desk-in-order.jpg',
      accent: 'pale',
      eyebrow: 'DESK ORGANIZER',
      intro: 'A practical print focused on keeping small everyday objects easier to find.',
      details: [
        ['Product', 'Organizer Laci'],
        ['Category', 'Home & Desk'],
        ['Format', 'Functional organizer'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'MAKE ROOM FOR THE SMALL THINGS.',
      story: 'Not every 3D print needs to be sentimental. Some are simply there to make a desk, drawer, or daily setup work a little better.',
      steps: [
        ['01', 'Need', 'Identify the objects and space to organize.'],
        ['02', 'Configure', 'Choose the suitable form for the intended use.'],
        ['03', 'Approve', 'Confirm the selected configuration.'],
        ['04', 'Print', 'Produce, check, and pack the organizer.']
      ]
    },
    {
      id: 'first-initial',
      number: '09',
      title: 'First Initial',
      category: 'home-desk',
      categoryLabel: 'Home & Desk',
      product: 'Papan Inisial',
      tag: 'Identity',
      image: 'assets/images/portfolio/first-initial.jpg',
      accent: 'light',
      eyebrow: 'INITIAL BOARD',
      intro: 'A compact personalized piece built around one letter and its visual character.',
      details: [
        ['Product', 'Papan Inisial'],
        ['Category', 'Home & Desk'],
        ['Format', 'Initial display'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'ONE LETTER. A LOT OF CHARACTER.',
      story: 'Initials are simple by nature, which makes them useful for gifts, rooms, desks, and personal corners where a small mark says enough.',
      steps: [
        ['01', 'Initial', 'Choose the letter or monogram direction.'],
        ['02', 'Compose', 'Build the visual arrangement around the initial.'],
        ['03', 'Approve', 'Confirm the layout.'],
        ['04', 'Print', 'Produce and finish the piece.']
      ]
    },
    {
      id: 'your-number',
      number: '10',
      title: 'Your Number',
      category: 'home-desk',
      categoryLabel: 'Home & Desk',
      product: 'Nomor Rumah',
      tag: 'Home',
      image: 'assets/images/portfolio/your-number.jpg',
      accent: 'blue',
      eyebrow: 'HOUSE NUMBER',
      intro: 'A simple address detail made as a physical element of the home.',
      details: [
        ['Product', 'Nomor Rumah'],
        ['Category', 'Home & Desk'],
        ['Format', 'Address display'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'AN ADDRESS, MADE DISTINCT.',
      story: 'House numbers are functional by default. A 3D version gives that functional detail a more visible and personal presence at the entrance.',
      steps: [
        ['01', 'Number', 'Provide the exact house number.'],
        ['02', 'Layout', 'Choose the visual treatment available.'],
        ['03', 'Approve', 'Confirm the final arrangement.'],
        ['04', 'Print', 'Produce and prepare for delivery.']
      ]
    },
    {
      id: 'little-name-keychain',
      number: '11',
      title: 'Little Name',
      category: 'personalized',
      categoryLabel: 'Personalized',
      product: 'Gantungan Kunci Nama',
      tag: 'Gifts',
      image: 'assets/images/portfolio/little-name-keychain.jpg',
      accent: 'pale',
      eyebrow: 'NAME KEYCHAIN',
      intro: 'A small personalized object designed to travel with you every day.',
      details: [
        ['Product', 'Gantungan Kunci Nama'],
        ['Category', 'Personalized'],
        ['Format', 'Personalized accessory'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'SMALL ENOUGH TO CARRY.',
      story: 'Personalization can be tiny. A name keychain turns a basic everyday item into something that belongs to one person.',
      steps: [
        ['01', 'Name', 'Provide the text to personalize.'],
        ['02', 'Style', 'Set the preferred format.'],
        ['03', 'Approve', 'Confirm the spelling and layout.'],
        ['04', 'Print', 'Produce and prepare for delivery.']
      ]
    },
    {
      id: 'stand-it-up',
      number: '12',
      title: 'Stand It Up',
      category: 'home-desk',
      categoryLabel: 'Home & Desk',
      product: 'Tulisan Berdiri',
      tag: 'Decor',
      image: 'assets/images/portfolio/stand-it-up.jpg',
      accent: 'dark',
      eyebrow: 'STANDING TEXT',
      intro: 'A short word or phrase turned into a tabletop object with presence.',
      details: [
        ['Product', 'Tulisan Berdiri'],
        ['Category', 'Home & Desk'],
        ['Format', 'Tabletop decor'],
        ['Order', 'Made to order']
      ],
      storyTitle: 'LET THE WORDS STAND.',
      story: 'A word on paper is easy to move past. Turn it into a physical object and it becomes part of the room around it.',
      steps: [
        ['01', 'Text', 'Provide the word or phrase.'],
        ['02', 'Layout', 'Set its scale and composition.'],
        ['03', 'Approve', 'Check the final design.'],
        ['04', 'Print', 'Produce and finish the piece.']
      ]
    }
  ];

  window.GYEP_PORTFOLIO = projects;
})();
