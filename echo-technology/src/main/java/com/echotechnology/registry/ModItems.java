package com.echotechnology.registry;

import com.echotechnology.EchoTechnology;
import net.minecraft.item.Item;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.util.Rarity;

public final class ModItems {
    public static final Item RESONANT_ALLOY = register("resonant_alloy", new Item(new Item.Settings()));
    public static final Item ECHO_CIRCUIT = register("echo_circuit", new Item(new Item.Settings()));
    public static final Item ENERGY_CELL = register("energy_cell", new Item(new Item.Settings()));
    public static final Item ECHO_DRILL = register("echo_drill",
            new Item(new Item.Settings().maxCount(1).rarity(Rarity.UNCOMMON)));
    public static final Item ECHO_SCANNER = register("echo_scanner",
            new Item(new Item.Settings().maxCount(1).rarity(Rarity.UNCOMMON)));
    public static final Item EFFICIENCY_UPGRADE = register("efficiency_upgrade", new Item(new Item.Settings().maxCount(16)));
    public static final Item CAPACITY_UPGRADE = register("capacity_upgrade", new Item(new Item.Settings().maxCount(16)));

    private ModItems() {
    }

    private static <T extends Item> T register(String name, T item) {
        return Registry.register(Registries.ITEM, EchoTechnology.id(name), item);
    }

    /** Forces class loading so the static fields above are registered during mod init. */
    public static void register() {
    }
}
