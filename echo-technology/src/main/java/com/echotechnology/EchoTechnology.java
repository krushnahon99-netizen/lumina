package com.echotechnology;

import com.echotechnology.registry.ModBlocks;
import com.echotechnology.registry.ModItemGroups;
import com.echotechnology.registry.ModItems;
import net.fabricmc.api.ModInitializer;
import net.minecraft.util.Identifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class EchoTechnology implements ModInitializer {
    public static final String MOD_ID = "echo_technology";
    public static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);

    public static Identifier id(String path) {
        return Identifier.of(MOD_ID, path);
    }

    @Override
    public void onInitialize() {
        ModBlocks.register();
        ModItems.register();
        ModItemGroups.register();
        LOGGER.info("Echo Technology loaded");
    }
}
