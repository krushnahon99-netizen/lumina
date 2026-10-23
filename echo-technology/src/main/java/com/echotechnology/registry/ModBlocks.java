package com.echotechnology.registry;

import com.echotechnology.EchoTechnology;
import com.echotechnology.block.MachineBlock;
import net.minecraft.block.AbstractBlock;
import net.minecraft.block.Block;
import net.minecraft.block.MapColor;
import net.minecraft.item.BlockItem;
import net.minecraft.item.Item;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.sound.BlockSoundGroup;

public final class ModBlocks {
    public static final Block ECHO_REACTOR = register("echo_reactor", new MachineBlock(machineSettings()));
    public static final Block ECHO_FABRICATOR = register("echo_fabricator", new MachineBlock(machineSettings()));
    public static final Block ECHO_CHARGER = register("echo_charger", new MachineBlock(machineSettings()));

    private ModBlocks() {
    }

    private static AbstractBlock.Settings machineSettings() {
        return AbstractBlock.Settings.create()
                .mapColor(MapColor.CYAN)
                .strength(3.5f, 6.0f)
                .requiresTool()
                .sounds(BlockSoundGroup.METAL);
    }

    private static Block register(String name, Block block) {
        Registry.register(Registries.BLOCK, EchoTechnology.id(name), block);
        Registry.register(Registries.ITEM, EchoTechnology.id(name), new BlockItem(block, new Item.Settings()));
        return block;
    }

    /** Forces class loading so the static fields above are registered during mod init. */
    public static void register() {
    }
}
