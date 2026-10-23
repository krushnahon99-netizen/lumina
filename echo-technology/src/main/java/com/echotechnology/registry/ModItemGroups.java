package com.echotechnology.registry;

import com.echotechnology.EchoTechnology;
import net.fabricmc.fabric.api.itemgroup.v1.FabricItemGroup;
import net.minecraft.item.ItemGroup;
import net.minecraft.item.ItemStack;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.text.Text;

public final class ModItemGroups {
    public static final ItemGroup ECHO_TECHNOLOGY = Registry.register(
            Registries.ITEM_GROUP,
            EchoTechnology.id("main"),
            FabricItemGroup.builder()
                    .icon(() -> new ItemStack(ModBlocks.ECHO_REACTOR))
                    .displayName(Text.translatable("itemGroup.echo_technology"))
                    .entries((context, entries) -> {
                        entries.add(ModBlocks.ECHO_REACTOR);
                        entries.add(ModBlocks.ECHO_FABRICATOR);
                        entries.add(ModBlocks.ECHO_CHARGER);
                        entries.add(ModItems.RESONANT_ALLOY);
                        entries.add(ModItems.ECHO_CIRCUIT);
                        entries.add(ModItems.ENERGY_CELL);
                        entries.add(ModItems.ECHO_DRILL);
                        entries.add(ModItems.ECHO_SCANNER);
                        entries.add(ModItems.EFFICIENCY_UPGRADE);
                        entries.add(ModItems.CAPACITY_UPGRADE);
                    })
                    .build());

    private ModItemGroups() {
    }

    /** Forces class loading so the item group above is registered during mod init. */
    public static void register() {
    }
}
