import MenuBar from '../MenuBar';

export default function MenuBarExample() {
  const menus = [
    {
      title: 'System',
      items: [
        { label: 'About', action: () => console.log('About clicked') },
        { separator: true },
        { label: 'Control Panels', action: () => console.log('Control Panels clicked') },
        { label: 'Restart', action: () => console.log('Restart clicked') },
        { label: 'Shut Down', action: () => console.log('Shut Down clicked') },
      ],
    },
    {
      title: 'Projects',
      items: [
        { label: 'Programming', action: () => console.log('Programming clicked') },
        { label: 'Tabletop', action: () => console.log('Tabletop clicked') },
        { label: 'Video Games', action: () => console.log('Video Games clicked') },
      ],
    },
    {
      title: 'Applications',
      items: [
        { label: 'SimpleText', action: () => console.log('SimpleText clicked') },
        { label: 'Calculator', action: () => console.log('Calculator clicked') },
      ],
    },
    {
      title: 'Links',
      items: [
        { label: 'GitHub', action: () => console.log('GitHub clicked') },
        { label: 'LinkedIn', action: () => console.log('LinkedIn clicked') },
        { label: 'Email', action: () => console.log('Email clicked') },
      ],
    },
  ];

  return <MenuBar menus={menus} />;
}
