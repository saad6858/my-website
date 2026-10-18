import test from 'node:test';
import assert from 'node:assert/strict';
import {validateMediaUpload, VIDEO_MAX_BYTES, IMAGE_MAX_BYTES} from './media-limits.ts';

test('video accepts exactly 95,000,000 bytes and rejects the next byte',()=>{
  assert.equal(VIDEO_MAX_BYTES,95_000_000);
  assert.equal(validateMediaUpload('video/mp4',VIDEO_MAX_BYTES).ok,true);
  assert.deepEqual(validateMediaUpload('video/mp4',VIDEO_MAX_BYTES+1),{ok:false,error:'Video files must be 95 MB or smaller. Image files must be 15 MB or smaller.',status:413});
});
test('images have an independent 15,000,000 byte limit',()=>{
  assert.equal(IMAGE_MAX_BYTES,15_000_000);
  assert.equal(validateMediaUpload('image/webp',IMAGE_MAX_BYTES).ok,true);
  assert.equal(validateMediaUpload('image/webp',IMAGE_MAX_BYTES+1).status,413);
});
test('unsupported MIME types and invalid byte counts are rejected',()=>{
  assert.equal(validateMediaUpload('application/pdf',100).status,415);
  assert.equal(validateMediaUpload('video/mp4',-1).status,400);
  assert.equal(validateMediaUpload('video/mp4',Number.NaN).status,400);
});
