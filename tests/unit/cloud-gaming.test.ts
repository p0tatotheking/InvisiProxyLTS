import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('proxy frame exposes cloud gaming permissions for now.gg and Xbox Cloud Gaming', () => {
	const proxyFrame = readFileSync(
		new URL('../../src/client/pages/ProxyFrame.tsx', import.meta.url),
		'utf8',
	);

	assert.match(
		proxyFrame,
		/allow=\{\s*['"]autoplay;\s*clipboard-write;\s*encrypted-media;\s*fullscreen;\s*gamepad;\s*microphone;\s*midi;\s*picture-in-picture;\s*xr-spatial-tracking['"]\s*\}/s,
	);

	const commonJs = readFileSync(
		new URL('../../views/assets/js/common.js', import.meta.url),
		'utf8',
	);
	assert.match(commonJs, /nowgg:\s*sjPreset\('https:\/\/now\.gg'\)/);
	assert.match(commonJs, /xboxcloud:\s*sjPreset\('https:\/\/www\.xbox\.com\/play'\)/);

	const settings = readFileSync(
		new URL('../../src/client/components/Settings.tsx', import.meta.url),
		'utf8',
	);
	assert.match(settings, /Cloud Gaming Mode/);
	assert.match(settings, /class=\{'switch cloudgaming'\}/);

	const registerSw = readFileSync(
		new URL('../../views/assets/js/register-sw.js', import.meta.url),
		'utf8',
	);
	assert.match(registerSw, /CloudGaming/);
});
