// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMenuStore = defineStore('menu', () => {
    let selectedMenu = ref(null)
    let selectedSubMenu = ref(null)
    let isCollapseMenu = ref(null)
    function activeMenu(menu) {
        if (selectedMenu.value == menu) {
            isCollapseMenu.value = !isCollapseMenu.value
        } else {
           isCollapseMenu.value = true
        }
        selectedMenu.value = menu;
    }
    function activeSubMenu(menu, subMenu = '') {
        selectedMenu.value = menu
        selectedSubMenu.value = subMenu
    }
    function isCurrent(menu, subMenu = "") {
        if (menu && !subMenu) {
            if (selectedMenu.value == 'dashboard' && menu == 'dashboard') return true 
            if (selectedMenu.value == menu && isCollapseMenu.value) {
                return true
            } else {
                return false
            }
        } 
        if (menu && subMenu) {
            if (selectedMenu.value == menu && selectedSubMenu.value == subMenu && isCollapseMenu.value == true) {
                return true
            }
        } 
        else {
            return false;
        }
    }

    return { selectedMenu, selectedSubMenu, isCollapseMenu, activeMenu, activeSubMenu, isCurrent }
})
