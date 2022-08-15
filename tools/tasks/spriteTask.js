import { isDev } from '../../server/lib/constants.js';
import minifySvg from '../../server/lib/minifySvg.js';
import path from 'path';

export default {
	dest: 'public/images/bundle.svg',
	glob: true,
	patterns: 'src/icons/*.svg',
	processAllContent(fileNames, icons) {
		icons = icons.map((icon, i) => icon.replace(/^<svg/u, `<svg id="${path.basename(fileNames[i], '.svg')}"`));

		const sprite = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<style>:root&gt;svg{display:none}:root&gt;svg:target{display:block}</style>
				${icons.join('\n\n')}
				</svg>`;

		return isDev ? sprite : minifySvg(sprite, isDev);
	}
};
