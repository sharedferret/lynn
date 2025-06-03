import React, { useCallback } from 'react';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export default function UniversalisRegionPicker() {
  const servers = {
    'North-America': {
      name: 'North America',
      dcs: {
        Aether: {
          name: 'Aether',
          servers: [
            'Adamantoise',
            'Cactuar',
            'Faerie',
            'Gilgamesh',
            'Jenova',
            'Midgardsormr',
            'Sargatanas',
            'Siren',
          ],
        },
        Primal: {
          name: 'Primal',
          servers: [
            'Behemoth',
            'Excalibur',
            'Exodus',
            'Famfrit',
            'Hyperion',
            'Lamia',
            'Leviathan',
            'Ultros',
          ],
        },
        Crystal: {
          name: 'Crystal',
          servers: [
            'Balmung',
            'Brynhildr',
            'Coeurl',
            'Diabolos',
            'Goblin',
            'Malboro',
            'Mateus',
            'Zalera',
          ],
        },
        Dynamis: {
          name: 'Dynamis',
          servers: [
            'Halicarnassus',
            'Maduin',
            'Marilith',
            'Seraph',
          ],
        },
      },
    },
    Europe: {
      name: 'Europe',
      dcs: {
        Chaos: {
          name: 'Chaos',
          servers: [
            'Cerberus',
            'Louisoix',
            'Moogle',
            'Omega',
            'Phantom',
            'Ragnarok',
            'Sagittarius',
            'Spriggan',
          ],
        },
        Light: {
          name: 'Light',
          servers: [
            'Alpha',
            'Lich',
            'Odin',
            'Phoenix',
            'Raiden',
            'Shiva',
            'Twintania',
            'Zodiark',
          ],
        },
      },
    },
    Japan: {
      name: 'Japan',
      dcs: {
        Elemental: {
          name: 'Elemental',
          servers: [
            'Aegis',
            'Atomos',
            'Carbuncle',
            'Garuda',
            'Gungnir',
            'Kujata',
            'Tonberry',
            'Typhon',
          ],
        },
        Gaia: {
          name: 'Gaia',
          servers: [
            'Alexander',
            'Bahamut',
            'Durandal',
            'Fenrir',
            'Ifrit',
            'Ridill',
            'Tiamat',
            'Ultima',
          ],
        },
        Mana: {
          name: 'Mana',
          servers: [
            'Anima',
            'Asura',
            'Chocobo',
            'Hades',
            'Ixion',
            'Masamune',
            'Pandaemonium',
            'Titan',
          ],
        },
        Meteor: {
          name: 'Meteor',
          servers: [
            'Belias',
            'Mandragora',
            'Ramuh',
            'Shinryu',
            'Unicorn',
            'Valefor',
            'Yojimbo',
            'Zeromus',
          ],
        },
      },
    },
    Oceania: {
      name: 'Oceania',
      dcs: {
        Materia: {
          name: 'Materia',
          servers: [
            'Bismarck',
            'Ravana',
            'Sephirot',
            'Sophia',
            'Zurvan',
          ],
        },
      },
    },
    한국: {
      name: '한국',
      dcs: {
        한국: {
          name: '한국',
          servers: [
            '모그리',
            '초코보',
            '카벙클',
            '톤베리',
            '펜리르',
          ],
        },
      },
    },
    中国: {
      name: '中国',
      dcs: {
        陆行鸟: {
          name: '陆行鸟',
          servers: [
            '宇宙和音',
            '幻影群岛',
            '拉诺西亚',
            '晨曦王座',
            '沃仙曦染',
            '神意之地',
            '红玉海',
            '萌芽池',
          ],
        },
        莫古力: {
          name: '莫古力',
          servers: [
            '拂晓之间',
            '旅人栈桥',
            '梦羽宝境',
            '潮风亭',
            '白金幻象',
            '白银乡',
            '神拳痕',
            '龙巢神殿',
          ],
        },
        猫小胖: {
          name: '猫小胖',
          servers: [
            '延夏',
            '摩杜纳',
            '柔风海湾',
            '海猫茶屋',
            '琥珀原',
            '紫水栈桥',
            '静语庄园',
          ],
        },
        豆豆柴: {
          name: '豆豆柴',
          servers: [
            '伊修加德',
            '太阳海岸',
            '月牙湾',
            '水晶塔',
            '红茶川',
            '银泪湖',
            '雪松原',
            '黄金谷',
          ],
        },
      },
    },
  };

  function populateMenuItems() {
    const items = Object.keys(servers).map((regionKey) => {
      const region = servers[regionKey];
      const regionItems = [];
      regionItems.push(
        <MenuItem value={region.name}>
          <Typography fontWeight={700} pt={2} style={{ textTransform: 'uppercase' }}>
            {region.name}
          </Typography>
        </MenuItem>,
      );
      regionItems.push(
        ...Object.keys(region.dcs).map((dcKey) => {
          const dc = region.dcs[dcKey];
          const dcItems = [];
          dcItems.push(
            <MenuItem value={dc.name}>
              <Typography fontWeight={700}>
                {dc.name}
              </Typography>
            </MenuItem>,
          );
          dcItems.push(
            ...dc.servers.map((server) => (
              <MenuItem value={server}>
                <Typography pl={1}>{server}</Typography>
              </MenuItem>
            )),
          );
          return dcItems.flat();
        }),
      );
      return regionItems.flat();
    });

    return items.flat();
  }

  const [server, setServer] = React.useState(localStorage.getItem('universalisServer'));

  const handleChange = useCallback((event) => {
    setServer(event.target.value);
    localStorage.setItem('universalisServer', event.target.value);
  }, [setServer]);

  return (
    <FormControl fullWidth>
      <Select
        label="Server"
        value={server}
        onChange={handleChange}
      >
        {populateMenuItems()}
      </Select>
    </FormControl>
  );
}
