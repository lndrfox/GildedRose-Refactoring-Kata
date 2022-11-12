import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('Adding item', () => {

    it('should add an item properly', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const newItem = gildedRose.items[0];
      expect(newItem.name).toBe('foo');
      expect(newItem.sellIn).toBe(0);
      expect(newItem.quality).toBe(0);
    });
  });

  describe('Quality behavior', () => {

    it('should decrease SellIn by one', () => {
      const gildedRose = new GildedRose([new Item('foo', 2, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(1);
    });

    it('should decrease quality by one if sellIn > 0 for normal items', () => {
      const gildedRose = new GildedRose([new Item('foo', 2, 2)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(1);
    });

    it('should not decrease quality under 0', () => {
      const gildedRose = new GildedRose([new Item('foo', 3, 1)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });

    it('should decrease quality twice as fast after sellIn is 0', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 4)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(2);
    });

    describe('Aged Brie quality behavior', () => {

      it('should increase in quality', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(1);
      });

      it('should increase in quality twice as fast after sellIn is 0', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(2);
      });

      it('should never go above a quality of 50', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(50);
      });
    });

    describe('Sulfuras behavior', () => {

      it('should not decrease in quality when there are sellIn days left', () => {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 80)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(80);
      });

      it('should not decrease in quality when there are no sellIn days left', () => {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(80);
      });
    });

    describe('Backstage passes behavior', () => {

      it('should increase quality by 1 when there are more than 10 sellIn days left', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 0)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(1);
      });

      it('should increase quality by 2 when there are 10 sellIn days left or less', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(2);
      });

      it('should increase quality by 3 when there are 5 sellIn days left or less', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(3);
      });

      it('should increase drop quality to 0 when there are no sellIn days left', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(0);
      });

      it('should not increase quality above 50', () => {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 50)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(50);
      });

    });
  });
});


