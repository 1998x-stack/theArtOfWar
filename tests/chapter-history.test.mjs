import test from 'node:test';
import assert from 'node:assert/strict';
import {chapterFromHash,recordChapterNavigation} from '../chapter-history.js';

test('only canonical valid chapter hashes resolve',()=>{
 for(const n of [1,2,13]) assert.equal(chapterFromHash(`#chapter-${n}`),n);
 for(const hash of ['', '#top','#chapter-0','#chapter-14','#chapter-1x','#chapter-1.5','#chapter--1']) assert.equal(chapterFromHash(hash),null);
});
test('chapter changes push browser history but repeats do not',()=>{
 const calls=[];const history={pushState:(...args)=>calls.push(args)};
 recordChapterNavigation(history,2,'#chapter-1');
 recordChapterNavigation(history,2,'#chapter-2');
 assert.deepEqual(calls,[[null,'','#chapter-2']]);
});
