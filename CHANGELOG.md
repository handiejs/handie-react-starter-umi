# 更新日志

## 0.0.6 (2022-05-23)

### 特性

- 动作 `execute` 将 `config` 作为参数传入；
- `Icon` 组件支持从 [`@ant-design/icons`](https://www.npmjs.com/package/@ant-design/icons) 中引用图标，需要注册 `antd` 这个图标提供者，通过 `<Icon refs="antd:step-backward" />` 的形式使用，如果 `antd` 为默认的图标提供者，则可以直接 `<Icon refs="step-backward" />`，图标引用中没有 `'outlined'`、`'filled'` 或 `'two-tone'` 时会默认使用「线框风格」的图标，具体可使用图标相见[官方文档](https://ant.design/components/icon-cn/)。

### 缺陷/优化

- 将对对话框视图的操作作为动作部件的通用能力；
- 移除 `DialogViewButtonActionWidget`，使用 `ButtonActionWidget`、`LinkActionWidget` 或 `IconActionWidget` 替代；
- 视图部件 `FormDialogViewWidget` 支持修改数据场景，并可通过配置项 `moduleLabel` 根据新增还是修改数据动态拼接对话框标题。
