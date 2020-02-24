export default {
  brands: [],
  phones: [],
  storages: [
    { title: '4', color: 'grey' },
    { title: '8', color: 'grey' },
    { title: '16', color: 'blue' },
    { title: '32', color: 'blue' },
    { title: '64', color: 'purple' },
    { title: '128', color: 'purple' },
    { title: '256', color: 'pink' },
    { title: '512', color: 'pink' }
  ],
  conditions: [
    {
      title: 'Wie neu',
      description:
        'Dein Gerät wurde nicht bis kaum genutzt und weißt keinerlei Kratzer oder Verschmutzungen auf.'
    },
    {
      title: 'Sehr gut',
      description:
        'Dein Gerät wurde eine wenig genutzt, jedoch sind kaum Kratzer oder Mikrokratzer zu sehen.'
    },
    {
      title: 'Gut',
      description:
        'Dein Gerät war eine Weile im Gebrauch und weißt nun einige Kratzer auf aber nur vereinzelt.'
    },
    {
      title: 'Akzeptabel',
      description:
        'Dein Gerät wurde stark genutzt und weißt nun vermehrt Kratzer auf.'
    }
  ],
  technicalConditions: [
    {
      title: 'Kein Technischer Defekt',
      description: 'Alles funktioniert problemlos.'
    },
    {
      title: 'Akku in schlechtem Zustand',
      description: 'Akku entlädt sich sehr schnell oder lädt nicht mehr.'
    },
    {
      title: 'Defekter Anschluss',
      description: 'Der Kopfhöreranschluss oder die Ladebuchse ist defekt.'
    },
    {
      title: 'Displayschaden',
      description:
        'Dein Display ist gesplittert, reagiert nicht mehr auf eingaben oder bleibt schwarz.'
    },
    {
      title: 'Kaputte Rückseite',
      description: 'Das Glas auf der Rückseite ist gesplittert,'
    }
  ],
  accessories: [
    'Originalverpackung',
    'Ladekabel',
    'Netzstecker',
    'Kopfhörer'
  ]
}
