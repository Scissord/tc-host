<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useUserStore } from '@store';
import { useOrder, useStatus, useColumns } from '@hooks';
import OrdersFilters from './blocks/OrdersFilters.vue';
import OrdersTable from './blocks/OrdersTable.vue';

const user = useUserStore();
console.log(user.data);

const { handleGetOrders } = useOrder();
const { handleGetColumns } = useColumns();
const { handleGetStatuses } = useStatus()

const isDataLoaded = ref(true);

const status = ref(null);
const statuses = reactive([]);
const columns = reactive([]);
const filters = reactive([]);

const orders = reactive({});

const handleChangeStatus = (val) => {
  status.value = val;
};

const handleApplyFilters = async (array) => {
  const ordersData = await handleGetOrders(array);
  for (const key in orders) {
    delete orders[key];
  };

  Object.assign(orders, ordersData.orders);
};

const handleGetData = async () => {
  isDataLoaded.value = false;
  const [ordersData, statusesData, columnsData] = await Promise.all([
    handleGetOrders([]),
    handleGetStatuses(),
    handleGetColumns(),
  ]);

  Object.assign(orders, ordersData.orders);
  statuses.splice(0, statuses.length, ...statusesData);
  columns.splice(0, columns.length, ...columnsData);
  filters.splice(
    0,
    filters.length,
    ...columnsData.map(item => ({ ...item, value: null }))
  );
  isDataLoaded.value = true;
};

onMounted(async () => {
  // await handleGetData();
});

// watch(() => user.data, (newVal) => {console.log(newVal)}, { deep: true });
</script>

<template>
  <div>
    <div v-if="isDataLoaded" class="min-h-screen p-6 flex flex-col gap-6 text-xs">
      <OrdersFilters
        :status="status"
        :statuses="statuses"
        :filters="filters"
        :handleApplyFilters="handleApplyFilters"
        @editStatus:status="handleChangeStatus"
      />
      <OrdersTable
        :columns="columns"
        :orders="orders"
      />
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <Loader/>
    </div>
  </div>

</template>